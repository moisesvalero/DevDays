export type CourseTrack = {
	id: 'helpdesk' | 'terminal' | 'codigo';
	label: string;
	title: string;
	description: string;
	href: string;
	icon: string;
	image: string;
	stats: string[];
};

export const courseTracks: CourseTrack[] = [
	{
		id: 'helpdesk',
		label: 'Service Desk',
		title: 'Simulador de incidencias IT',
		description:
			'Resuelve tickets de entorno Windows empresa: contraseña, VPN, red, correo, impresoras, permisos y seguridad.',
		href: '/estudio',
		icon: 'support_agent',
		image: '/tickets/hd-005-vpn-routes.jpg',
		stats: ['15 tickets', 'Diagnóstico guiado', 'Cierre o escalado']
	},
	{
		id: 'terminal',
		label: 'Terminal',
		title: 'Laboratorio de comandos diarios',
		description:
			'Practica WSL, Git, GitHub CLI y pnpm en una terminal simulada para coger soltura sin romper nada real.',
		href: '/terminal',
		icon: 'terminal',
		image: '/tickets/hd-004-dns-failure.jpg',
		stats: ['12 lecciones', 'Xterm.js', 'Práctica segura']
	},
	{
		id: 'codigo',
		label: 'Código',
		title: 'Construye tu portfolio',
		description:
			'Recupera el curso original de JavaScript, Svelte y SvelteKit con 35 días de fundamentos, ejercicios y mini laboratorios.',
		href: '/codigo',
		icon: 'code_blocks',
		image: '/tickets/hd-010-windows-update.jpg',
		stats: ['35 días', 'JavaScript + Svelte', 'Proyecto portfolio']
	}
];
