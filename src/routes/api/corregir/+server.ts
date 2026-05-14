import { json, error } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

/**
 * Modelo gratis de Gemini con JSON mode (responseSchema garantiza el formato).
 * Si Google cambia el nombre del modelo en el futuro, basta con ajustar este string.
 */
const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type Body = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigo: string;
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(401, 'No autorizado');
  if (!GEMINI_API_KEY) throw error(500, 'GEMINI_API_KEY no configurada');

  const body = (await request.json()) as Body;
  const { dia, ejercicio, enunciado, codigo } = body;

  const prompt = `Eres un profesor estricto pero amable de JavaScript y SvelteKit.
Día ${dia}, Ejercicio ${ejercicio}.
Enunciado: ${enunciado}

Código del alumno:
\`\`\`js
${codigo}
\`\`\`

Tarea:
- Decide si el código cumple el enunciado.
- Si tiene errores menores de estilo pero la lógica es correcta, considéralo correcto.
- Si está vacío, sin lógica o trivialmente incorrecto, marca correcto=false.
- Responde con JSON estricto siguiendo el schema.
- Sé breve (máximo 4 líneas en feedback). Habla en español, segunda persona (tú).`;

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              correcto: { type: 'boolean' },
              feedback: { type: 'string' },
              sugerencia: { type: 'string' }
            },
            required: ['correcto', 'feedback']
          }
        }
      })
    });
  } catch {
    return json(
      { correcto: false, feedback: 'No pude conectar con la IA. Reintenta en unos segundos.' },
      { status: 200 }
    );
  }

  if (!res.ok) {
    return json(
      {
        correcto: false,
        feedback: `La IA respondió con error (${res.status}). Reintenta en unos segundos.`
      },
      { status: 200 }
    );
  }

  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

  try {
    const parsed = JSON.parse(text);
    return json({
      correcto: Boolean(parsed.correcto),
      feedback: String(parsed.feedback ?? '').trim() || 'Sin feedback.',
      sugerencia: parsed.sugerencia ?? null
    });
  } catch {
    return json({
      correcto: false,
      feedback: 'Respuesta de la IA no válida. Reintenta en unos segundos.'
    });
  }
};
