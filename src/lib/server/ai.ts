import { callOpenAI, type OpenAIMessage } from './openai';
import { callGemini } from './gemini';
import type { HelpdeskTicket, TicketEvaluation, TicketSubmission } from '$lib/types/helpdesk';

export type ChatResult = {
	respuesta: string;
	provider: 'openai' | 'gemini' | 'none';
	errorMsg?: string;
};

export type TicketReviewInput = {
	ticket: HelpdeskTicket;
	submission: TicketSubmission;
	localEvaluation: TicketEvaluation;
};

export type TicketReviewResult = {
	feedback: string;
	hints: string[];
	provider: 'openai' | 'gemini' | 'none';
};

export type HelpdeskChatInput = {
	ticket: HelpdeskTicket;
	mensaje: string;
	selectedActionIds: string[];
	notes: string;
	historial: Array<{ role: 'user' | 'model'; text: string }>;
};

const TICKET_REVIEW_SCHEMA = {
	type: 'object',
	additionalProperties: false,
	properties: {
		feedback: { type: 'string' },
		hints: { type: 'array', items: { type: 'string' } }
	},
	required: ['feedback', 'hints']
} as const;

export async function reviewTicketResolution(
	input: TicketReviewInput
): Promise<TicketReviewResult> {
	const systemMsg = `Eres un formador de técnicos helpdesk nivel 1. Hablas en español, claro y directo.

Reglas:
- Evalúa método de diagnóstico, seguridad, decisión de cierre/escalado y comunicación.
- No inventes herramientas no vistas en el ticket.
- No des una solución perfecta para copiar; da feedback accionable.
- Máximo 4 frases y 3 pistas.`;

	const selectedActions = input.ticket.actions
		.filter((action) => input.submission.selectedActionIds.includes(action.id))
		.map((action) => `- ${action.label}: ${action.result}`)
		.join('\n');

	const userMsg = `Ticket ${input.ticket.ticketId}: ${input.ticket.title}
Mensaje usuario: ${input.ticket.userMessage}
Diagnóstico esperado: ${input.ticket.expectedDiagnosis.summary}
Solución esperada: ${input.ticket.expectedSolution.summary}
Escalado requerido: ${input.ticket.escalation.required ? 'sí' : 'no'} (${input.ticket.escalation.reason})

Acciones realizadas:
${selectedActions || '- Ninguna'}

Respuesta del alumno:
Diagnóstico: ${input.submission.diagnosis}
Solución: ${input.submission.solution}
Decisión: ${input.submission.decision}
Mensaje al usuario: ${input.submission.userReply}

Evaluación local: ${input.localEvaluation.score}/100.
Fallos locales:
${input.localEvaluation.hints.map((hint) => `- ${hint}`).join('\n') || '- Ninguno'}`;

	const openai = await callOpenAI({
		messages: [
			{ role: 'system', content: systemMsg },
			{ role: 'user', content: userMsg }
		],
		temperature: 0.4,
		jsonSchema: {
			name: 'revision_ticket_helpdesk',
			schema: TICKET_REVIEW_SCHEMA as unknown as Record<string, unknown>,
			strict: true
		},
		maxAttempts: 2
	});

	if (openai.ok) {
		const parsed = parseTicketReview(openai.text);
		if (parsed) return { ...parsed, provider: 'openai' };
	}

	const gemini = await callGemini(
		{
			contents: [{ role: 'user', parts: [{ text: `${systemMsg}\n\n${userMsg}` }] }],
			generationConfig: {
				temperature: 0.4,
				responseMimeType: 'application/json',
				responseSchema: {
					type: 'object',
					properties: {
						feedback: { type: 'string' },
						hints: { type: 'array', items: { type: 'string' } }
					},
					required: ['feedback', 'hints']
				}
			}
		},
		{ maxAttempts: 2 }
	);

	if (gemini.ok) {
		const data = gemini.data as {
			candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
		};
		const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
		const parsed = parseTicketReview(text);
		if (parsed) return { ...parsed, provider: 'gemini' };
	}

	return { feedback: '', hints: [], provider: 'none' };
}

export async function chatHelpdeskTutor(input: HelpdeskChatInput): Promise<ChatResult> {
	if (!input.mensaje?.trim()) {
		return {
			respuesta: 'Escribe la duda del ticket y te ayudo a ordenar el diagnóstico.',
			provider: 'none'
		};
	}

	const selectedActions = input.ticket.actions
		.filter((action) => input.selectedActionIds.includes(action.id))
		.map((action) => `- ${action.label}: ${action.result}`)
		.join('\n');

	const systemMsg = `Eres un mentor de helpdesk nivel 1 en una empresa Windows.

Reglas:
- Ayuda a pensar, no cierres el ticket por el alumno.
- No des la respuesta completa lista para pegar.
- Prioriza seguridad: no pedir contraseñas, no saltarse permisos, escalar malware/phishing.
- Máximo 8 líneas.

Ticket ${input.ticket.ticketId}: ${input.ticket.title}
Mensaje usuario: ${input.ticket.userMessage}
Entorno: ${input.ticket.environment.join(', ')}
Síntomas: ${input.ticket.symptoms.join(', ')}
Acciones ya realizadas:
${selectedActions || '- Ninguna'}
Notas del alumno: ${input.notes || 'Sin notas.'}`;

	const historial = input.historial.slice(-10);
	const openaiMessages: OpenAIMessage[] = [
		{ role: 'system', content: systemMsg },
		...historial.map<OpenAIMessage>((m) => ({
			role: m.role === 'model' ? 'assistant' : 'user',
			content: String(m.text ?? '')
		})),
		{ role: 'user', content: input.mensaje }
	];

	const openai = await callOpenAI({
		messages: openaiMessages,
		temperature: 0.5,
		maxAttempts: 2
	});

	if (openai.ok && openai.text.trim()) {
		return { respuesta: openai.text.trim(), provider: 'openai' };
	}

	const geminiHistorial = historial.map((m) => ({
		role: m.role,
		parts: [{ text: String(m.text ?? '') }]
	}));

	const gemini = await callGemini(
		{
			systemInstruction: { parts: [{ text: systemMsg }] },
			contents: [...geminiHistorial, { role: 'user', parts: [{ text: input.mensaje }] }],
			generationConfig: { temperature: 0.5 }
		},
		{ maxAttempts: 2 }
	);

	if (gemini.ok) {
		const data = gemini.data as {
			candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
		};
		const text = String(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim();
		if (text) return { respuesta: text, provider: 'gemini' };
	}

	const msg = buildAiErrorMessage(openai, gemini);
	return { respuesta: msg, provider: 'none', errorMsg: msg };
}

function parseTicketReview(text: string): Omit<TicketReviewResult, 'provider'> | null {
	if (!text?.trim()) return null;
	try {
		const parsed = JSON.parse(text);
		return {
			feedback: String(parsed.feedback ?? '').trim(),
			hints: Array.isArray(parsed.hints)
				? parsed.hints.map((hint: unknown) => String(hint)).filter(Boolean)
				: []
		};
	} catch {
		return null;
	}
}

function buildAiErrorMessage(
	openai: Awaited<ReturnType<typeof callOpenAI>>,
	gemini: Awaited<ReturnType<typeof callGemini>>
): string {
	const openaiFail = !openai.ok ? openai : null;
	const geminiFail = !gemini.ok ? gemini : null;

	if (openaiFail?.reason === 'network' && geminiFail?.reason === 'network') {
		return 'No pude conectar con la IA. Reintenta en unos segundos.';
	}
	if (openaiFail?.status === 429 || geminiFail?.status === 429) {
		return 'Demasiadas peticiones a la IA. Espera unos segundos y reintenta.';
	}
	const status = openaiFail?.status || geminiFail?.status || 0;
	if (status >= 500) {
		return `La IA está saturada (${status}). Reintenta en unos segundos.`;
	}
	return 'La IA no pudo responder ahora. Puedes seguir con la corrección local.';
}
