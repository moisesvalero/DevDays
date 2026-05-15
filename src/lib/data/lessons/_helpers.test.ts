import { describe, it, expect } from 'vitest';
import { ej, sec } from './_helpers';

describe('lesson helpers', () => {
  it('sec incluye analogía y paraQuéSirve', () => {
    const s = sec('Título', 'Analogía', 'Uso real', 'Qué hace');
    expect(s.titulo).toBe('Título');
    expect(s.analogia).toBe('Analogía');
    expect(s.paraQueSirve).toBe('Uso real');
  });

  it('ej incluye criterios de lógica', () => {
    const e = ej(1, 'Historia', 'Enunciado', ['A'], ['B'], '// plantilla');
    expect(e.numero).toBe(1);
    expect(e.queDebePasar).toEqual(['A']);
    expect(e.criteriosLogica).toEqual(['B']);
  });
});
