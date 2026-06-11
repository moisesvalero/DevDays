export type HelpdeskModule =
	| 'identidad'
	| 'red'
	| 'correo'
	| 'impresion'
	| 'sistema'
	| 'perifericos'
	| 'seguridad';

type TicketDifficulty = 'suave' | 'media' | 'reto';

type DiagnosticActionType = 'pregunta' | 'comando' | 'configuracion' | 'fisico' | 'seguridad';

export type TicketDecision = 'cerrar' | 'escalar';

type DiagnosticAction = {
	id: string;
	type: DiagnosticActionType;
	label: string;
	result: string;
};

type ExpectedAnswer = {
	summary: string;
	keywords: string[];
};

type EscalationRule = {
	required: boolean;
	when: string;
	reason: string;
};

type TicketImage = {
	src: string;
	alt: string;
	caption: string;
};

export type HelpdeskTicket = {
	ticketId: string;
	module: HelpdeskModule;
	difficulty: TicketDifficulty;
	estimatedMinutes: number;
	title: string;
	userMessage: string;
	image: TicketImage;
	environment: string[];
	symptoms: string[];
	actions: DiagnosticAction[];
	requiredActionIds: string[];
	expectedDiagnosis: ExpectedAnswer;
	expectedSolution: ExpectedAnswer;
	escalation: EscalationRule;
	mentorHints: string[];
	closureCue: string;
};

export type TicketProgressStatus = 'sin_empezar' | 'en_progreso' | 'resuelto';

export type TicketSubmission = {
	ticketId: string;
	selectedActionIds: string[];
	notes: string;
	diagnosis: string;
	solution: string;
	userReply: string;
	decision: TicketDecision;
};

export type EvaluationCheck = {
	id: 'acciones' | 'diagnostico' | 'solucion' | 'decision' | 'comunicacion';
	label: string;
	points: number;
	maxPoints: number;
	passed: boolean;
	feedback: string;
};

export type TicketEvaluation = {
	score: number;
	maxScore: number;
	passed: boolean;
	checks: EvaluationCheck[];
	feedback: string;
	hints: string[];
};

export type TicketProgress = TicketSubmission & {
	status: TicketProgressStatus;
	score: number;
	feedback: string;
	updatedAt: string;
};
