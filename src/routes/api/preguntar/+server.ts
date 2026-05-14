import { json, error } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type ChatMsg = { role: 'user' | 'model'; text: string };

type Body = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigoActual?: string;
  mensaje: string;
  historial: ChatMsg[];
};

/**
 * Chat libre con el tutor. SOLO para aclarar dudas.
 * Reglas blindadas en el systemInstruction: no aprueba, no da solución literal,
 * remite al botón "Corregir" para evaluar.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(401, 'No autorizado');
  if (!GEMINI_API_KEY) throw error(500, 'GEMINI_API_KEY no configurada');

  const body = (await request.json()) as Body;
  const {
    dia,
    ejercicio,
    enunciado,
    codigoActual = '',
    mensaje,
    historial = []
  } = body;

  if (!mensaje?.trim()) {
    return json({ respuesta: 'Escríbeme la duda y te ayudo.' });
  }

  const systemInstruction = `Eres un tutor de programación amable y conciso. Hablas en español, segunda persona (tú).
Reglas estrictas:
- NO confirmes que un ejercicio está aprobado ni digas frases como "ya puedes pasar" o "está perfecto, marca como hecho". La evaluación oficial la hace el botón "Corregir".
- NO escribas la solución completa y lista para pegar del ejercicio actual. Como mucho, pseudocódigo o fragmentos cortos que ilustren conceptos.
- Si el alumno pide "dame la solución", recuérdale que tu objetivo es que aprenda; explícale el concepto y dale pistas.
- Respuestas breves (máx ~6 líneas) y prácticas.
- Si la duda es ajena al ejercicio (otra cosa de JS o SvelteKit), respóndela igualmente, manteniendo las reglas anteriores.

Contexto del ejercicio en curso:
- Día ${dia}, Ejercicio ${ejercicio}.
- Enunciado: ${enunciado}
${codigoActual ? `\nÚltimo código del alumno (puede estar incompleto):\n\`\`\`js\n${codigoActual}\n\`\`\`` : ''}`;

  // Limitamos historial a las últimas 12 entradas para no inflar el prompt.
  const safeHistorial = historial.slice(-12).map((m) => ({
    role: m.role,
    parts: [{ text: String(m.text ?? '') }]
  }));

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [
          ...safeHistorial,
          { role: 'user', parts: [{ text: mensaje }] }
        ],
        generationConfig: { temperature: 0.6 }
      })
    });
  } catch {
    return json({ respuesta: 'No pude conectar con la IA. Reintenta en unos segundos.' });
  }

  if (!res.ok) {
    return json({
      respuesta: `La IA respondió con error (${res.status}). Reintenta en unos segundos.`
    });
  }

  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const respuesta = String(text).trim();

  return json({
    respuesta: respuesta || 'No tengo respuesta clara ahora. Reformula la duda y lo intentamos otra vez.'
  });
};
