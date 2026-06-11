export type SiteLocale = 'es' | 'en';

export const PORTFOLIO_LOCALE_COOKIE = 'portfolio_locale';

export function parseSiteLocaleCookie(value: string | null | undefined): SiteLocale | null {
	if (!value) return null;
	const v = value.trim().toLowerCase();
	if (v === 'en') return 'en';
	if (v === 'es') return 'es';
	return null;
}
