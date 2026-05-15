import { callOpenAI, type OpenAIMessage } from './openai';
import { callGemini } from './gemini';

export type CorreccionResult = {
  correcto: boolean;
  feedback: string;
  pistas: string[];
  snippetGuia: string;
  provider: 'openai' | 'gemini' | 'none';
};

export type CorreccionInput = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigo: string;
  queDebePasar?: string[];
  criteriosLogica?: string[];
  nivelAyuda?: 'normal' | 'extra';
};

export type ChatInput = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigoActual?: string;
  queDebePasar?: string[];
  mensaje: string;
  historial: Array<{ role: 'user' | 'model'; text: string }>;
};

export type ChatResult = {
  respuesta: string;
  provider: 'openai' | 'gemini' | 'none';
  errorMsg?: string;
};

const PEDAGOGIA = `Pedagogía DevDays (obligatoria):
- El alumno aprende QUÉ HACE cada cosa y PARA QUÉ SIRVE, no memoriza sintaxis.
- Usa analogías de taller, almacén, oficios manuales o vida cotidiana.
- NO regañes por typos, punto y coma, nombres de variables distintos, let vs const intercambiables, ni por no usar la API exacta del enunciado si el resultado es el mismo.
- SÍ rechaza si la lógica no cumple lo esencial o el código está vacío/sin intención.`;

function buildSystemCorreccion(nivelAyuda: 'normal' | 'extra') {
  return `Eres un tutor de programación amable, paciente y motivador. Hablas en español, segunda persona (tú).

${PEDAGOGIA}

Contexto de datos:
- Evalúa solo el código y criterios de ESTA petición.
- No inventes errores que no estén en el código pegado.

Reglas de evaluación:
- "correcto" = true si el código cumple la INTENCIÓN y los criterios de lógica (efecto observable), aunque la sintaxis sea imperfecta.
- Acepta métodos equivalentes (for vs map, comillas simples vs template string si el texto final es correcto).
- "correcto" = false solo si falla la parte central, está vacío, o no demuestra comprensión.

Formato JSON:
- "feedback": 1-2 frases con analogía, alentadoras.
- "pistas": 2-4 pistas sobre la LÓGICA o la historia del ejercicio (sin código). Si correcto=true, array vacío o una mejora opcional.
- "snippetGuia": ${
    nivelAyuda === 'extra'
      ? 'Si correcto=false: pseudocódigo o frase narrativa (NO solución literal para pegar). Si correcto=true: vacío.'
      : 'SIEMPRE vacío salvo nivelAyuda extra.'
  }`;
}

function buildUserCorreccion(input: CorreccionInput) {
  const criterios = input.criteriosLogica?.length
    ? `\nCriterios de lógica (lo esencial):\n${input.criteriosLogica.map((c) => `- ${c}`).join('\n')}`
    : '';
  const debe = input.queDebePasar?.length
    ? `\nQué debe pasar:\n${input.queDebePasar.map((q) => `- ${q}`).join('\n')}`
    : '';

  return `Día ${input.dia} · Ejercicio ${input.ejercicio}.
Enunciado: ${input.enunciado}${debe}${criterios}

Código del alumno:
\`\`\`js
${input.codigo}
\`\`\``;
}

function buildSystemChat(input: ChatInput) {
  const debe = input.queDebePasar?.length
    ? `\nQué debe lograr el ejercicio:\n${input.queDebePasar.map((q) => `- ${q}`).join('\n')}`
    : '';

  return `Eres un tutor de programación amable y conciso. Hablas en español, segunda persona (tú).

${PEDAGOGIA}

Reglas:
- NO confirmes aprobación oficial (eso es el botón Corregir).
- NO des la solución completa lista para pegar.
- Explica: analogía → qué hace → para qué sirve. Máx ~8 líneas.
- Si piden sintaxis: recuérdale que puede escribir la idea y usar autocompletado (Tab).

Contexto: Día ${input.dia}, Ejercicio ${input.ejercicio}.
Enunciado: ${input.enunciado}${debe}
${input.codigoActual ? `\nCódigo actual del alumno:\n\`\`\`js\n${input.codigoActual}\n\`\`\`` : ''}`;
}

const CORRECCION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    correcto: { type: 'boolean' },
    feedback: { type: 'string' },
    pistas: { type: 'array', items: { type: 'string' } },
    snippetGuia: { type: 'string' }
  },
  required: ['correcto', 'feedback', 'pistas', 'snippetGuia']
} as const;

export async function correctCode(input: CorreccionInput): Promise<CorreccionResult> {
  const nivelAyuda = input.nivelAyuda ?? 'normal';
  const systemMsg = buildSystemCorreccion(nivelAyuda);
  const userMsg = buildUserCorreccion(input);

  const openai = await callOpenAI({
    messages: [
      { role: 'system', content: systemMsg },
      { role: 'user', content: userMsg }
    ],
    temperature: 0.4,
    jsonSchema: {
      name: 'correccion_ejercicio',
      schema: CORRECCION_SCHEMA as unknown as Record<string, unknown>,
      strict: true
    }
  });

  if (openai.ok) {
    const parsed = parseCorreccion(openai.text);
    if (parsed) return { ...parsed, provider: 'openai' };
  }

  const geminiPrompt = `${systemMsg}\n\n${userMsg}`;
  const gemini = await callGemini({
    contents: [{ role: 'user', parts: [{ text: geminiPrompt }] }],
    generationConfig: {
      temperature: 0.4,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          correcto: { type: 'boolean' },
          feedback: { type: 'string' },
          pistas: { type: 'array', items: { type: 'string' } },
          snippetGuia: { type: 'string' }
        },
        required: ['correcto', 'feedback', 'pistas']
      }
    }
  });

  if (gemini.ok) {
    const data = gemini.data as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const parsed = parseCorreccion(text);
    if (parsed) return { ...parsed, provider: 'gemini' };
  }

  const msg = buildAiErrorMessage(openai, gemini);
  return {
    correcto: false,
    feedback: msg,
    pistas: [],
    snippetGuia: '',
    provider: 'none'
  };
}

function parseCorreccion(text: string): Omit<CorreccionResult, 'provider'> | null {
  if (!text?.trim()) return null;
  try {
    const parsed = JSON.parse(text);
    return {
      correcto: Boolean(parsed.correcto),
      feedback: String(parsed.feedback ?? '').trim() || 'Sin feedback.',
      pistas: Array.isArray(parsed.pistas)
        ? parsed.pistas.map((p: unknown) => String(p)).filter((p: string) => p.length > 0)
        : [],
      snippetGuia: String(parsed.snippetGuia ?? '').trim()
    };
  } catch {
    return null;
  }
}

export async function chatTutor(input: ChatInput): Promise<ChatResult> {
  if (!input.mensaje?.trim()) {
    return { respuesta: 'Escríbeme la duda y te ayudo.', provider: 'none' };
  }

  const systemMsg = buildSystemChat(input);
  const historial = input.historial.slice(-12);

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
    temperature: 0.6
  });

  if (openai.ok && openai.text.trim()) {
    return { respuesta: openai.text.trim(), provider: 'openai' };
  }

  const geminiHistorial = historial.map((m) => ({
    role: m.role,
    parts: [{ text: String(m.text ?? '') }]
  }));

  const gemini = await callGemini({
    systemInstruction: { parts: [{ text: systemMsg }] },
    contents: [...geminiHistorial, { role: 'user', parts: [{ text: input.mensaje }] }],
    generationConfig: { temperature: 0.6 }
  });

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
    return 'Demasiadas peticiones a la IA. Espera ~30 segundos y reintenta.';
  }
  const status = openaiFail?.status || geminiFail?.status || 0;
  if (status >= 500) {
    return `La IA está saturada (${status}). Reintenta en unos segundos.`;
  }
  if (status === 401 || status === 403) {
    return 'Hay un problema con la API key de la IA. Avisa al admin.';
  }
  return 'La IA no respondió correctamente. Reintenta en unos segundos.';
}
