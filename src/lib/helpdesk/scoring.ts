import type {
	EvaluationCheck,
	HelpdeskTicket,
	TicketEvaluation,
	TicketSubmission
} from '$lib/types/helpdesk';

const MAX_SCORE = 100;
const TEXT_MIN_LENGTH = 30;

export function evaluateTicket(
	ticket: HelpdeskTicket,
	submission: TicketSubmission
): TicketEvaluation {
	const selected = new Set(submission.selectedActionIds);
	const missingActions = ticket.requiredActionIds.filter((actionId) => !selected.has(actionId));
	const actionPoints = Math.round(
		((ticket.requiredActionIds.length - missingActions.length) / ticket.requiredActionIds.length) *
			20
	);

	const diagnosisMatches = countKeywordMatches(
		submission.diagnosis,
		ticket.expectedDiagnosis.keywords
	);
	const solutionMatches = countKeywordMatches(
		submission.solution,
		ticket.expectedSolution.keywords
	);
	const diagnosisPoints = scoreKeywordMatch(
		diagnosisMatches,
		ticket.expectedDiagnosis.keywords.length,
		25
	);
	const solutionPoints = scoreKeywordMatch(
		solutionMatches,
		ticket.expectedSolution.keywords.length,
		25
	);
	const expectedDecision = ticket.escalation.required ? 'escalar' : 'cerrar';
	const decisionPoints = submission.decision === expectedDecision ? 15 : 0;
	const communicationPoints = scoreCommunication(submission.userReply);

	const checks: EvaluationCheck[] = [
		{
			id: 'acciones',
			label: 'Pruebas mínimas',
			points: actionPoints,
			maxPoints: 20,
			passed: missingActions.length === 0,
			feedback:
				missingActions.length === 0
					? 'Has realizado las comprobaciones clave.'
					: `Faltan pruebas clave: ${missingActions.join(', ')}.`
		},
		{
			id: 'diagnostico',
			label: 'Diagnóstico',
			points: diagnosisPoints,
			maxPoints: 25,
			passed: diagnosisPoints >= 18,
			feedback:
				diagnosisPoints >= 18
					? 'El diagnóstico apunta a la causa correcta.'
					: `Incluye la idea central: ${ticket.expectedDiagnosis.summary}`
		},
		{
			id: 'solucion',
			label: 'Solución',
			points: solutionPoints,
			maxPoints: 25,
			passed: solutionPoints >= 18,
			feedback:
				solutionPoints >= 18
					? 'La solución propuesta encaja con el caso.'
					: `Aterriza la solución esperada: ${ticket.expectedSolution.summary}`
		},
		{
			id: 'decision',
			label: 'Cierre o escalado',
			points: decisionPoints,
			maxPoints: 15,
			passed: decisionPoints === 15,
			feedback:
				decisionPoints === 15
					? 'La decisión final es correcta.'
					: `Este ticket debería ${expectedDecision === 'escalar' ? 'escalarse' : 'cerrarse en nivel 1'}.`
		},
		{
			id: 'comunicacion',
			label: 'Comunicación',
			points: communicationPoints,
			maxPoints: 15,
			passed: communicationPoints >= 10,
			feedback:
				communicationPoints >= 10
					? 'La respuesta al usuario es clara y profesional.'
					: 'Explica al usuario qué ocurrió, qué hiciste y cuál es el siguiente paso.'
		}
	];

	const score = checks.reduce((total, check) => total + check.points, 0);
	const hints = checks.filter((check) => !check.passed).map((check) => check.feedback);

	return {
		score,
		maxScore: MAX_SCORE,
		passed: score >= 75 && checks.every((check) => check.id === 'comunicacion' || check.passed),
		checks,
		feedback: buildFeedback(score, ticket.escalation.required),
		hints
	};
}

export function createEmptySubmission(ticketId: string): TicketSubmission {
	return {
		ticketId,
		selectedActionIds: [],
		notes: '',
		diagnosis: '',
		solution: '',
		userReply: '',
		decision: 'cerrar'
	};
}

function scoreKeywordMatch(matches: number, totalKeywords: number, maxPoints: number): number {
	if (totalKeywords === 0) return 0;
	return Math.round((matches / totalKeywords) * maxPoints);
}

function countKeywordMatches(text: string, keywords: string[]): number {
	const normalizedText = normalizeText(text);
	return keywords.filter((keyword) => normalizedText.includes(normalizeText(keyword))).length;
}

function scoreCommunication(text: string): number {
	const normalized = normalizeText(text);
	if (normalized.length < TEXT_MIN_LENGTH) return 0;

	let points = 8;
	if (/(hola|buenos dias|buenas|gracias)/.test(normalized)) points += 2;
	if (/(he revisado|hemos revisado|se ha|queda|puedes|por favor)/.test(normalized)) points += 3;
	if (/(si vuelve|si persiste|siguiente paso|escalado|reportado)/.test(normalized)) points += 2;
	return Math.min(points, 15);
}

function buildFeedback(score: number, requiresEscalation: boolean): string {
	if (score >= 90) {
		return requiresEscalation
			? 'Buen trabajo: contuviste el caso y escalaste con criterio.'
			: 'Buen trabajo: resolviste el ticket con método de nivel 1.';
	}
	if (score >= 75) return 'Vas bien: el caso está resuelto, pero puedes pulir el cierre.';
	return 'Aún falta método: revisa pruebas, causa raíz y decisión final.';
}

function normalizeText(text: string): string {
	return text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim();
}
