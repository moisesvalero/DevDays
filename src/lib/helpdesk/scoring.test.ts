import { describe, expect, it } from 'vitest';
import { helpdeskTickets } from '$lib/data/helpdesk-tickets';
import { createEmptySubmission, evaluateTicket } from './scoring';

describe('evaluateTicket', () => {
	it('aprueba un ticket de nivel 1 con acciones, diagnóstico, solución y cierre correctos', () => {
		const ticket = helpdeskTickets.find((item) => item.ticketId === 'HD-003');
		expect(ticket).toBeDefined();
		if (!ticket) return;

		const result = evaluateTicket(ticket, {
			ticketId: ticket.ticketId,
			selectedActionIds: ticket.requiredActionIds,
			notes: 'IP APIPA tras revisar ipconfig.',
			diagnosis: 'El equipo quedó con 169.254/APIPA porque DHCP no entregó configuración válida.',
			solution: 'Renovar DHCP, confirmar puerta de enlace y probar navegación con el usuario.',
			userReply:
				'Hola, he renovado la configuración de red del equipo. Ya tienes puerta de enlace y puedes navegar. Si vuelve a ocurrir, avísanos.',
			decision: 'cerrar'
		});

		expect(result.passed).toBe(true);
		expect(result.score).toBeGreaterThanOrEqual(90);
	});

	it('penaliza cuando faltan pruebas obligatorias', () => {
		const ticket = helpdeskTickets[0];
		const result = evaluateTicket(ticket, {
			...createEmptySubmission(ticket.ticketId),
			selectedActionIds: [ticket.requiredActionIds[0]],
			diagnosis: ticket.expectedDiagnosis.summary,
			solution: ticket.expectedSolution.summary,
			userReply: 'Hola, he revisado el caso y te indico el siguiente paso.',
			decision: 'cerrar'
		});

		expect(result.checks.find((check) => check.id === 'acciones')?.passed).toBe(false);
		expect(result.passed).toBe(false);
	});

	it('exige escalar cuando el ticket contiene riesgo o permisos sensibles', () => {
		const ticket = helpdeskTickets.find((item) => item.ticketId === 'HD-013');
		expect(ticket).toBeDefined();
		if (!ticket) return;

		const wrongDecision = evaluateTicket(ticket, {
			ticketId: ticket.ticketId,
			selectedActionIds: ticket.requiredActionIds,
			notes: 'Correo con enlace externo.',
			diagnosis: 'Es phishing por enlace externo y petición de contraseña.',
			solution: 'No abrir, reportar a seguridad y borrar según procedimiento.',
			userReply:
				'Hola, no abras el enlace. Lo he reportado al canal de seguridad y te avisaremos si hay más pasos.',
			decision: 'cerrar'
		});

		expect(wrongDecision.checks.find((check) => check.id === 'decision')?.passed).toBe(false);
		expect(wrongDecision.passed).toBe(false);

		const correctDecision = evaluateTicket(ticket, {
			...wrongDecisionToSubmission(ticket.ticketId, ticket.requiredActionIds),
			decision: 'escalar'
		});

		expect(correctDecision.checks.find((check) => check.id === 'decision')?.passed).toBe(true);
	});
});

function wrongDecisionToSubmission(ticketId: string, selectedActionIds: string[]) {
	return {
		ticketId,
		selectedActionIds,
		notes: 'Correo con enlace externo.',
		diagnosis: 'Es phishing por enlace externo y petición de contraseña.',
		solution: 'No abrir, reportar a seguridad y borrar según procedimiento.',
		userReply:
			'Hola, no abras el enlace. Lo he reportado al canal de seguridad y te avisaremos si hay más pasos.',
		decision: 'escalar' as const
	};
}
