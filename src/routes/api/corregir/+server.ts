import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { correctCode } from '$lib/server/ai';
import type { RequestHandler } from './$types';

type Body = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigo: string;
  queDebePasar?: string[];
  criteriosLogica?: string[];
  nivelAyuda?: 'normal' | 'extra';
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(401, 'No autorizado');
  if (!env.OPENAI_API_KEY && !env.GEMINI_API_KEY) {
    throw error(500, 'No hay ninguna API de IA configurada (OPENAI_API_KEY o GEMINI_API_KEY)');
  }

  const body = (await request.json()) as Body;
  const result = await correctCode({
    dia: body.dia,
    ejercicio: body.ejercicio,
    enunciado: body.enunciado,
    codigo: body.codigo,
    queDebePasar: body.queDebePasar,
    criteriosLogica: body.criteriosLogica,
    nivelAyuda: body.nivelAyuda ?? 'normal'
  });

  return json({
    correcto: result.correcto,
    feedback: result.feedback,
    pistas: result.pistas,
    snippetGuia: result.snippetGuia
  });
};
