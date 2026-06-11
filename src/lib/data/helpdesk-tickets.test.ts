import { describe, expect, it } from 'vitest';
import { helpdeskTickets } from './helpdesk-tickets';

describe('helpdeskTickets', () => {
	it('define una colección inicial de tickets nivel 1 ordenada', () => {
		expect(helpdeskTickets).toHaveLength(15);
		expect(helpdeskTickets.map((ticket) => ticket.ticketId)).toEqual(
			Array.from({ length: 15 }, (_, index) => `HD-${String(index + 1).padStart(3, '0')}`)
		);
	});

	it('incluye acciones, criterios y pistas en cada ticket', () => {
		for (const ticket of helpdeskTickets) {
			expect(ticket.actions.length).toBeGreaterThanOrEqual(4);
			expect(ticket.requiredActionIds.length).toBeGreaterThanOrEqual(3);
			expect(ticket.image.src).toMatch(/^\/tickets\/.+\.jpg$/);
			expect(ticket.image.alt.length).toBeGreaterThan(20);
			expect(ticket.image.caption).toMatch(/\.jpg$/);
			expect(
				ticket.requiredActionIds.every((id) => ticket.actions.some((action) => action.id === id))
			).toBe(true);
			expect(ticket.expectedDiagnosis.keywords.length).toBeGreaterThanOrEqual(3);
			expect(ticket.expectedSolution.keywords.length).toBeGreaterThanOrEqual(3);
			expect(ticket.mentorHints.length).toBeGreaterThanOrEqual(3);
		}
	});

	it('incluye casos que deben escalarse', () => {
		const escalationTickets = helpdeskTickets.filter((ticket) => ticket.escalation.required);
		expect(escalationTickets.map((ticket) => ticket.ticketId)).toEqual([
			'HD-011',
			'HD-013',
			'HD-014'
		]);
	});

	it('usa una imagen distinta para cada ticket', () => {
		const imageSources = helpdeskTickets.map((ticket) => ticket.image.src);
		expect(new Set(imageSources).size).toBe(helpdeskTickets.length);
	});
});
