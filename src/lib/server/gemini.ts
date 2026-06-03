import { env } from '$env/dynamic/private';

const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

/** Códigos HTTP que merecen reintento (saturación / rate limit / 5xx transitorios). */
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

export type GeminiResult =
	| { ok: true; data: unknown }
	| { ok: false; status: number; reason: 'http' | 'network' | 'retries-exhausted' };

/**
 * Llama a Gemini con retry + backoff exponencial.
 *
 * Por defecto reintenta hasta 4 veces (1 inicial + 3 retries) ante 429/5xx,
 * con esperas crecientes (~0.6s, 1.4s, 3s + jitter). Para errores no
 * recuperables (400, 401, 403...) devuelve directamente sin reintentar.
 *
 * Así enmascaramos los "503 modelo saturado" típicos del free tier
 * sin que el usuario los vea.
 */
export async function callGemini(
	body: unknown,
	opts: { maxAttempts?: number; signal?: AbortSignal } = {}
): Promise<GeminiResult> {
	const apiKey = env.GEMINI_API_KEY;
	if (!apiKey) {
		return { ok: false, status: 0, reason: 'http' };
	}

	const maxAttempts = opts.maxAttempts ?? 4;
	let lastStatus = 0;

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		if (attempt > 0) {
			const base = 400 * 2 ** (attempt - 1);
			const jitter = Math.floor(Math.random() * 250);
			await sleep(base + jitter);
		}

		try {
			const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(body),
				signal: opts.signal
			});

			if (res.ok) {
				return { ok: true, data: await res.json() };
			}

			lastStatus = res.status;
			if (!RETRYABLE_STATUS.has(res.status)) {
				return { ok: false, status: res.status, reason: 'http' };
			}
			// Si entra aquí, status retryable y queda intentar otra vez.
		} catch {
			// Error de red: también reintentamos.
			lastStatus = 0;
		}
	}

	return {
		ok: false,
		status: lastStatus,
		reason: lastStatus === 0 ? 'network' : 'retries-exhausted'
	};
}

function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}
