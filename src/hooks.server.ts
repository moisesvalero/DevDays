import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { dev, building } from '$app/environment';
import { PORTFOLIO_LOCALE_COOKIE, parseSiteLocaleCookie } from '$lib/i18n/site-locale';
import { createSupabaseServerClient } from '$lib/server/supabase/server-client';
import { isEmailAllowed } from '$lib/server/allowlist';

const ONE_YEAR_IN_SECONDS = 31536000;
const TWO_YEARS_IN_SECONDS = 63072000;

/**
 * Resuelve el idioma para SSR:
 *  1) cookie `portfolio_locale` (sobrescribe todo: refleja una elección manual)
 *  2) cabecera `Accept-Language` del navegador
 *  3) fallback `es`
 *
 * Esto alimenta `<html lang="%lang%">` en `src/app.html` para que crawlers/IAs
 * vean el idioma correcto desde la primera respuesta HTML, no tras hidratar.
 */
function resolveLang(event: Parameters<Handle>[0]['event']): 'es' | 'en' {
	const cookieLang = parseSiteLocaleCookie(event.cookies.get(PORTFOLIO_LOCALE_COOKIE));
	if (cookieLang) return cookieLang;
	const accept = event.request.headers.get('accept-language') || '';
	if (accept.toLowerCase().startsWith('en')) return 'en';
	return 'es';
}

/**
 * Crea el cliente Supabase para esta request y resuelve `locals.user`.
 * Usamos `getUser()` (no `getSession()`) en server porque valida el JWT.
 */
const handleSupabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event);
	const {
		data: { user }
	} = await event.locals.supabase.auth.getUser();

	// Allowlist: si hay user pero su email no está autorizado, lo cerramos y
	// dejamos `locals.user = null`. Esto bloquea el acceso al guard de /estudio
	// y a los endpoints (que comprueban `locals.user`). El usuario verá /login.
	if (user && !isEmailAllowed(user.email)) {
		await event.locals.supabase.auth.signOut();
		event.locals.user = null;
	} else {
		event.locals.user = user;
	}

	return resolve(event);
};

const handleSecurity: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || 'light';
	const lang = resolveLang(event);

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%theme%', theme).replace('%lang%', lang)
	});

	if (!building) {
		// Content-Security-Policy (CSP) — la defensa mas importante
		response.headers.set(
			'Content-Security-Policy',
			[
				"default-src 'self'",
				// SvelteKit inyecta scripts inline de hidratación; un hash fijo se rompe al cambiar Vite/Kit.
				"script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
				"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
				"img-src 'self' data: https:",
				"font-src 'self' https://fonts.gstatic.com",
				"connect-src 'self' https:",
				"frame-src 'self' https://*.typebot.io",
				"frame-ancestors 'none'",
				"base-uri 'self'",
				"form-action 'self'"
			].join('; ')
		);

		// HSTS — fuerza HTTPS (solo en produccion, no en dev)
		if (!dev) {
			response.headers.set(
				'Strict-Transport-Security',
				`max-age=${TWO_YEARS_IN_SECONDS}; includeSubDomains; preload`
			);
		}

		// Anti-clickjacking
		response.headers.set('X-Frame-Options', 'DENY');

		// Anti-MIME sniffing
		response.headers.set('X-Content-Type-Options', 'nosniff');

		// Control de referrer
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

		// Permissions-Policy — bloquea APIs que no usas
		response.headers.set(
			'Permissions-Policy',
			[
				'camera=()',
				'microphone=()',
				'geolocation=()',
				'payment=()',
				'usb=()',
				'bluetooth=()',
				'magnetometer=()',
				'gyroscope=()',
				'accelerometer=()',
				'autoplay=(self)',
				'fullscreen=(self)'
			].join(', ')
		);

		// Cross-Origin isolation headers
		response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
		response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

		// DNS prefetch control
		response.headers.set('X-DNS-Prefetch-Control', 'on');

		// Remover header que revela tecnologia del servidor
		response.headers.set('X-Powered-By', '');

		// Cache control para assets estaticos
		const url = event.url.pathname;
		if (url.match(/\.(js|css|svg|png|jpg|jpeg|gif|ico|woff2?)$/)) {
			response.headers.set('Cache-Control', `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`);
		}
	}

	return response;
};

export const handle = sequence(handleSupabase, handleSecurity);
