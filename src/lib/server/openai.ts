import { env } from '$env/dynamic/private';

const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

/** Códigos HTTP que merecen reintento (saturación / rate limit / 5xx transitorios). */
const RETRYABLE_STATUS = new Set([408, 409, 429, 500, 502, 503, 504]);

export type OpenAIResult =
	| { ok: true; text: string }
	| { ok: false; status: number; reason: 'http' | 'network' | 'retries-exhausted' };

export type OpenAIMessage = {
	role: 'system' | 'user' | 'assistant';
	content: string;
};

export type OpenAIJsonSchema = {
	name: string;
	schema: Record<string, unknown>;
	strict?: boolean;
};

export type OpenAICallOptions = {
	model?: string;
	messages: OpenAIMessage[];
	temperature?: number;
	jsonSchema?: OpenAIJsonSchema;
	maxAttempts?: number;
	signal?: AbortSignal;
};

/**
 * Llama a OpenAI Chat Completions con retry + backoff exponencial.
 * Devuelve directamente el texto del mensaje (que será JSON si se pasó jsonSchema).
 */
export async function callOpenAI(opts: OpenAICallOptions): Promise<OpenAIResult> {
	const apiKey = env.OPENAI_API_KEY;
	if (!apiKey) {
		return { ok: false, status: 0, reason: 'http' };
	}

	const maxAttempts = opts.maxAttempts ?? 3;
	let lastStatus = 0;

	const body: Record<string, unknown> = {
		model: opts.model ?? 'gpt-5.4-mini',
		messages: opts.messages,
		temperature: opts.temperature ?? 0.4
	};

	if (opts.jsonSchema) {
		body.response_format = {
			type: 'json_schema',
			json_schema: {
				name: opts.jsonSchema.name,
				schema: opts.jsonSchema.schema,
				strict: opts.jsonSchema.strict ?? true
			}
		};
	}

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		if (attempt > 0) {
			const base = 400 * 2 ** (attempt - 1);
			const jitter = Math.floor(Math.random() * 250);
			await sleep(base + jitter);
		}

		try {
			const res = await fetch(ENDPOINT, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${apiKey}`
				},
				body: JSON.stringify(body),
				signal: opts.signal
			});

			if (res.ok) {
				const data = (await res.json()) as {
					choices?: Array<{ message?: { content?: string } }>;
				};
				const text = data?.choices?.[0]?.message?.content ?? '';
				return { ok: true, text };
			}

			lastStatus = res.status;
			if (!RETRYABLE_STATUS.has(res.status)) {
				return { ok: false, status: res.status, reason: 'http' };
			}
		} catch {
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
