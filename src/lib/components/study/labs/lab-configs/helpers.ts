import type { LabBlockConfig, LabFieldDef, LabUiVariant, LabValues } from '$lib/types/laboratorio';
import type { SpecLine } from '../LiveSpecPanel.svelte';

export function fields(...defs: LabFieldDef[]): LabFieldDef[] {
	return defs;
}

export function specLet(key: string): SpecLine {
	return { kind: 'let', key };
}

export function specComment(text: string): SpecLine {
	return { kind: 'comment', text };
}

export function specDerived(name: string, expr: string, resultKey: string): SpecLine {
	return { kind: 'derived', name, expr, resultKey };
}

export function block(
	partial: Omit<LabBlockConfig, 'fields' | 'derived' | 'specLines'> & {
		variant: LabUiVariant;
		fields: LabFieldDef[];
		derived: Array<{
			resultKey: string;
			name: string;
			expr: string;
			compute: (v: LabValues) => string | number | boolean;
		}>;
		extraSpec?: SpecLine[];
	}
): LabBlockConfig {
	const specLines: SpecLine[] = [
		specComment(`// Spec: ${partial.titulo}`),
		...partial.fields.map((f) => specLet(f.key)),
		...partial.derived.map((d) => specDerived(d.name, d.expr, d.resultKey)),
		...(partial.extraSpec ?? [])
	];
	const rest = { ...partial };
	delete rest.extraSpec;
	return { ...rest, specLines };
}
