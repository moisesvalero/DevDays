import { callOpenAI, type OpenAIMessage } from './openai';
import { callGemini } from './gemini';

export type CorreccionResult = {
  correcto: boolean;
  feedback: string;
  pistas: string[];
  snippetGuia: string;
  /** Para depurar: qué proveedor acabó respondiendo (o 'none' si fallaron todos). */
  provider: 'openai' | 'gemini' | 'none';
};

export type CorreccionInput = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigo: string;
  nivelAyuda?: 'normal' | 'extra';
};

export type ChatInput = {
  dia: number;
  ejercicio: number;
  enunciado: string;
  codigoActual?: string;
  mensaje: string;
  historial: Array<{ role: 'user' | 'model'; text: string }>;
};

export type ChatResult = {
  respuesta: string;
  provider: 'openai' | 'gemini' | 'none';
  /** Mensaje legible si todos los proveedores fallaron. */
  errorMsg?: string;
};

/* ------------------------------------------------------------------ */
/* Prompts compartidos                                                */
/* ------------------------------------------------------------------ */

function buildSystemCorreccion(nivelAyuda: 'normal' | 'extra') {
  return `Eres un tutor de programación amable, paciente y motivador. Hablas en español, segunda persona (tú).

Contexto de datos (importante):
- En cada petición recibes el enunciado OFICIAL y el código del alumno en ESTE momento. No hay otra "versión" en el servidor: evalúa solo lo que viene en el mensaje.
- No digas que el alumno escribió cosas que no aparecen literalmente en su código (por ejemplo ** de Markdown, ni comillas raras), salvo que estén en el código pegado.

Formato de texto y código en tu respuesta JSON:
- En "feedback" y "pistas" usa español claro. Evita sintaxis Markdown tipo **negrita** (puede confundirse con operadores). Si necesitas destacar, usa comillas simples o MAYÚSCULAS suaves.
- En "snippetGuia" (si lo rellenas) escribe JavaScript legible. Para mostrar ejemplos de strings usa comillas simples o dobles normales. NO uses barras invertidas para "escapar" backticks (\`texto\`); si hace falta un template literal, escríbelo en una sola línea con backticks reales o evita template literals en el snippet.

Reglas de evaluación:
- "correcto" SOLO si el código resuelve realmente lo que pide el enunciado (lógica + requisitos).
- Sé flexible con estilos menores (nombres, console.log no pedidos, ordenamientos opcionales), pero NUNCA marques correcto=true si la lógica falla o falta la parte central del ejercicio.
- Si está vacío, sin lógica o trivial: correcto=false.

Cómo responder (JSON estricto según el schema):
- "feedback": 1-2 líneas amables, alentadoras, en español. Nada de regaños.
- "pistas": array con 2-4 pistas concretas en TEXTO (sin código) que orienten qué falta o qué revisar. Si correcto=true, puedes devolver array vacío o una pista de mejora.
- "snippetGuia": ${
    nivelAyuda === 'extra'
      ? 'OBLIGATORIO si correcto=false. 2-4 líneas de JavaScript que ilustren la TÉCNICA o el patrón necesario, NO la solución literal del ejercicio. Si correcto=true, déjalo vacío.'
      : 'Déjalo SIEMPRE vacío en esta respuesta. El alumno no ha pedido aún ayuda extra.'
  }`;
}

function buildUserCorreccion(input: CorreccionInput) {
  return `Día ${input.dia} · Ejercicio ${input.ejercicio}.
Enunciado: ${input.enunciado}

Código del alumno:
\`\`\`js
${input.codigo}
\`\`\``;
}

function buildSystemChat(input: ChatInput) {
  return `Eres un tutor de programación amable y conciso. Hablas en español, segunda persona (tú).

Reglas estrictas:
- NO confirmes que un ejercicio está aprobado ni digas frases como "ya puedes pasar" o "está perfecto, marca como hecho". La evaluación oficial la hace el botón "Corregir".
- NO escribas la solución completa y lista para pegar del ejercicio actual. Como mucho, pseudocódigo o fragmentos cortos que ilustren conceptos.
- Si el alumno pide "dame la solución", recuérdale que tu objetivo es que aprenda; explícale el concepto y dale pistas.
- Respuestas breves (máx ~6 líneas) y prácticas.
- Si la duda es ajena al ejercicio (otra cosa de JS o SvelteKit), respóndela igualmente, manteniendo las reglas anteriores.

Veracidad y formato (evita confusiones):
- El "Enunciado" y el bloque de código de abajo son la fuente de verdad de ESTA petición. Si el historial del chat contradice algo, prioriza SIEMPRE el enunciado y el código actual.
- No digas que el alumno escribió ** (Markdown), comillas raras, ni caracteres que no aparecen en su último mensaje o en el código pegado.
- Para enseñar sintaxis de template literals o backticks, usa un bloque de código Markdown bien formado: una línea con solo tres acentos graves, líneas de código, otra línea con tres acentos graves. Ejemplo correcto:
\`\`\`js
const x = \`hola \${nombre}\`;
\`\`\`
- NO uses barras invertidas delante de acentos graves (\`) ni secuencias tipo /\\ para simular comillas: el alumno las copiaría mal. Dentro de un bloque \`\`\`js el código lleva backticks y \${} como en un editor real.
- Evita **negrita** Markdown en medio de explicaciones de código; usa comillas simples para nombres ('nombre') o bloques \`\`\`js.

Contexto del ejercicio en curso:
- Día ${input.dia}, Ejercicio ${input.ejercicio}.
- Enunciado: ${input.enunciado}
${input.codigoActual ? `\nÚltimo código del alumno (puede estar incompleto):\n\`\`\`js\n${input.codigoActual}\n\`\`\`` : ''}`;
}

const CORRECCION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    correcto: { type: 'boolean' },
    feedback: { type: 'string' },
    pistas: { type: 'array', items: { type: 'string' } },
    snippetGuia: { type: 'string' }
  },
  required: ['correcto', 'feedback', 'pistas', 'snippetGuia']
} as const;

/* ------------------------------------------------------------------ */
/* correctCode: OpenAI primero, fallback a Gemini                     */
/* ------------------------------------------------------------------ */

export async function correctCode(input: CorreccionInput): Promise<CorreccionResult> {
  const nivelAyuda = input.nivelAyuda ?? 'normal';
  const systemMsg = buildSystemCorreccion(nivelAyuda);
  const userMsg = buildUserCorreccion(input);

  // 1) OpenAI
  const openai = await callOpenAI({
    messages: [
      { role: 'system', content: systemMsg },
      { role: 'user', content: userMsg }
    ],
    temperature: 0.4,
    jsonSchema: {
      name: 'correccion_ejercicio',
      schema: CORRECCION_SCHEMA as unknown as Record<string, unknown>,
      strict: true
    }
  });

  if (openai.ok) {
    const parsed = parseCorreccion(openai.text);
    if (parsed) return { ...parsed, provider: 'openai' };
  }

  // 2) Fallback Gemini
  const geminiPrompt = `${systemMsg}\n\n${userMsg}`;
  const gemini = await callGemini({
    contents: [{ role: 'user', parts: [{ text: geminiPrompt }] }],
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
  });

  if (gemini.ok) {
    const data = gemini.data as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const parsed = parseCorreccion(text);
    if (parsed) return { ...parsed, provider: 'gemini' };
  }

  // 3) Todos fallaron → mensaje amistoso
  const msg = buildAiErrorMessage(openai, gemini);
  return {
    correcto: false,
    feedback: msg,
    pistas: [],
    snippetGuia: '',
    provider: 'none'
  };
}

function parseCorreccion(text: string): Omit<CorreccionResult, 'provider'> | null {
  if (!text?.trim()) return null;
  try {
    const parsed = JSON.parse(text);
    return {
      correcto: Boolean(parsed.correcto),
      feedback: String(parsed.feedback ?? '').trim() || 'Sin feedback.',
      pistas: Array.isArray(parsed.pistas)
        ? parsed.pistas.map((p: unknown) => String(p)).filter((p: string) => p.length > 0)
        : [],
      snippetGuia: String(parsed.snippetGuia ?? '').trim()
    };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* chatTutor: OpenAI primero, fallback a Gemini                       */
/* ------------------------------------------------------------------ */

export async function chatTutor(input: ChatInput): Promise<ChatResult> {
  if (!input.mensaje?.trim()) {
    return { respuesta: 'Escríbeme la duda y te ayudo.', provider: 'none' };
  }

  const systemMsg = buildSystemChat(input);
  const historial = input.historial.slice(-12);

  // 1) OpenAI
  const openaiMessages: OpenAIMessage[] = [
    { role: 'system', content: systemMsg },
    ...historial.map<OpenAIMessage>((m) => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: String(m.text ?? '')
    })),
    { role: 'user', content: input.mensaje }
  ];

  const openai = await callOpenAI({
    messages: openaiMessages,
    temperature: 0.6
  });

  if (openai.ok && openai.text.trim()) {
    return { respuesta: openai.text.trim(), provider: 'openai' };
  }

  // 2) Fallback Gemini
  const geminiHistorial = historial.map((m) => ({
    role: m.role,
    parts: [{ text: String(m.text ?? '') }]
  }));

  const gemini = await callGemini({
    systemInstruction: { parts: [{ text: systemMsg }] },
    contents: [...geminiHistorial, { role: 'user', parts: [{ text: input.mensaje }] }],
    generationConfig: { temperature: 0.6 }
  });

  if (gemini.ok) {
    const data = gemini.data as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = String(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim();
    if (text) return { respuesta: text, provider: 'gemini' };
  }

  // 3) Todos fallaron
  const msg = buildAiErrorMessage(openai, gemini);
  return { respuesta: msg, provider: 'none', errorMsg: msg };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildAiErrorMessage(
  openai: Awaited<ReturnType<typeof callOpenAI>>,
  gemini: Awaited<ReturnType<typeof callGemini>>
): string {
  const openaiFail = !openai.ok ? openai : null;
  const geminiFail = !gemini.ok ? gemini : null;

  if (openaiFail?.reason === 'network' && geminiFail?.reason === 'network') {
    return 'No pude conectar con la IA. Reintenta en unos segundos.';
  }
  if (openaiFail?.status === 429 || geminiFail?.status === 429) {
    return 'Demasiadas peticiones a la IA. Espera ~30 segundos y reintenta.';
  }
  const status = openaiFail?.status || geminiFail?.status || 0;
  if (status >= 500) {
    return `La IA está saturada (${status}). Reintenta en unos segundos.`;
  }
  if (status === 401 || status === 403) {
    return 'Hay un problema con la API key de la IA. Avisa al admin.';
  }
  return 'La IA no respondió correctamente. Reintenta en unos segundos.';
}
