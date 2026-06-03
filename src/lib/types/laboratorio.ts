import type { SpecLine } from '$lib/components/study/labs/LiveSpecPanel.svelte';

/** IDs de laboratorios visuales (lecciones + repasos semanales). */
export type IdLaboratorio =
	| 'dia-1-variables'
	| 'dia-2-operadores'
	| 'dia-3-condicionales'
	| 'dia-4-funciones'
	| 'dia-5-arrays-transform'
	| 'dia-6-arrays-aggregate'
	| 'dia-8-objetos'
	| 'dia-9-bucles'
	| 'dia-10-closures'
	| 'dia-11-promesas'
	| 'dia-12-async'
	| 'dia-13-dom'
	| 'dia-15-svelte-stack'
	| 'dia-16-svelte-archivo'
	| 'dia-17-state'
	| 'dia-18-derived'
	| 'dia-19-props'
	| 'dia-20-eventos'
	| 'dia-22-rutas'
	| 'dia-23-layouts'
	| 'dia-24-dinamicas'
	| 'dia-25-load'
	| 'dia-26-forms'
	| 'dia-27-supabase'
	| 'dia-29-typescript'
	| 'dia-30-env'
	| 'dia-31-deploy'
	| 'dia-32-stack-story'
	| 'dia-33-entrevista'
	| 'dia-34-proyecto'
	| 'repaso-s1'
	| 'repaso-s2'
	| 'repaso-s3'
	| 'repaso-s4'
	| 'repaso-s5';

export type LabValues = Record<string, number | boolean | string>;

export type LabFieldDef = {
	key: string;
	label: string;
	kind: 'number' | 'boolean' | 'string';
	default: number | boolean | string;
	min?: number;
	max?: number;
};

export type LabDerivedDef = {
	resultKey: string;
	name: string;
	expr: string;
	compute: (v: LabValues) => string | number | boolean;
};

/** Variante de UI premium (estilo día 2). */
export type LabUiVariant =
	| 'inventory'
	| 'profile'
	| 'pricetag'
	| 'status'
	| 'cta'
	| 'plans'
	| 'formula'
	| 'listops'
	| 'compare'
	| 'rules'
	| 'timeline'
	| 'route'
	| 'form'
	| 'auth'
	| 'story'
	| 'component';

export type LabBlockConfig = {
	titulo: string;
	spec: string;
	variant: LabUiVariant;
	hint?: string;
	uiTitle: string;
	uiDescription: string;
	fields: LabFieldDef[];
	derived: LabDerivedDef[];
	specLines: SpecLine[];
};

export type DayLabConfig = {
	heroTitle: string;
	heroSubtitle: string;
	flowNodes: { id: string; label: string; sub?: string; accent?: boolean }[];
	labs: [LabBlockConfig, LabBlockConfig, LabBlockConfig];
};

export type RepasoCardConfig = {
	titulo: string;
	descripcion: string;
	variant: LabUiVariant;
	fields: LabFieldDef[];
	derived: LabDerivedDef[];
	specLines: SpecLine[];
};

export type RepasoLabConfig = {
	titulo: string;
	subtitulo: string;
	cards: RepasoCardConfig[];
};
