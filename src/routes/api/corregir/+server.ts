import { json, error } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type Body = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigo: string;
  nivelAyuda?: 'normal' | 'extra';
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(401, 'No autorizado');
  if (!GEMINI_API_KEY) throw error(500, 'GEMINI_API_KEY no configurada');

  const body = (await request.json()) as Body;
  const { dia, ejercicio, enunciado, codigo, nivelAyuda = 'normal' } = body;

  // El criterio sigue siendo estricto (el código DEBE cumplir el enunciado),
  // pero el tono y la ayuda son progresivos: pistas siempre; snippet de
  // técnica solo cuando el alumno pide "más ayuda".
  const prompt = `Eres un tutor de programación amable, paciente y motivador.
Día ${dia} · Ejercicio ${ejercicio}.
Enunciado: ${enunciado}

Código del alumno:
\`\`\`js
${codigo}
\`\`\`

Reglas de evaluación:
- "correcto" SOLO si el código resuelve realmente lo que pide el enunciado (lógica + requisitos).
- Sé flexible con estilos menores (nombres, console.log no pedidos, ordenamientos opcionales), pero NUNCA marques correcto=true si la lógica falla o falta la parte central del ejercicio.
- Si está vacío, sin lógica o trivial: correcto=false.

Cómo responder (JSON estricto según el schema):
- "feedback": 1-2 líneas amables, alentadoras, en español, segunda persona (tú). Nada de regaños.
- "pistas": array con 2-4 pistas concretas en TEXTO (sin código) que orienten qué falta o qué revisar. Si correcto=true, puedes devolver array vacío o una pista de mejora.
- "snippetGuia": ${
    nivelAyuda === 'extra'
      ? 'OBLIGATORIO si correcto=false. 2-4 líneas de JavaScript que ilustren la TÉCNICA o el patrón necesario, NO la solución literal del ejercicio. Si correcto=true, déjalo vacío.'
      : 'Déjalo SIEMPRE vacío en esta respuesta. El alumno no ha pedido aún ayuda extra.'
  }`;

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
              pistas: { type: 'array', items: { type: 'string' } },
              snippetGuia: { type: 'string' }
            },
            required: ['correcto', 'feedback', 'pistas']
          }
        }
      })
    });
  } catch {
    return json(
      {
        correcto: false,
        feedback: 'No pude conectar con la IA. Reintenta en unos segundos.',
        pistas: [],
        snippetGuia: ''
      },
      { status: 200 }
    );
  }

  if (!res.ok) {
    return json(
      {
        correcto: false,
        feedback: `La IA respondió con error (${res.status}). Reintenta en unos segundos.`,
        pistas: [],
        snippetGuia: ''
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
      pistas: Array.isArray(parsed.pistas)
        ? parsed.pistas.map((p: unknown) => String(p)).filter((p: string) => p.length > 0)
        : [],
      snippetGuia: String(parsed.snippetGuia ?? '').trim()
    });
  } catch {
    return json({
      correcto: false,
      feedback: 'Respuesta de la IA no válida. Reintenta en unos segundos.',
      pistas: [],
      snippetGuia: ''
    });
  }
};
