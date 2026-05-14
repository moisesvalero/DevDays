import { json, error } from '@sveltejs/kit';
import { OPENAI_API_KEY, GEMINI_API_KEY } from '$env/static/private';
import { chatTutor } from '$lib/server/ai';
import type { RequestHandler } from './$types';

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
 * Reglas blindadas en el systemInstruction (ver $lib/server/ai.ts):
 * no aprueba, no da solución literal, remite al botón "Corregir" para evaluar.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(401, 'No autorizado');
  if (!OPENAI_API_KEY && !GEMINI_API_KEY) {
    throw error(500, 'No hay ninguna API de IA configurada (OPENAI_API_KEY o GEMINI_API_KEY)');
  }

  const body = (await request.json()) as Body;
  const result = await chatTutor({
    dia: body.dia,
    ejercicio: body.ejercicio,
    enunciado: body.enunciado,
    codigoActual: body.codigoActual ?? '',
    mensaje: body.mensaje,
    historial: body.historial ?? []
  });

  return json({ respuesta: result.respuesta });
};
