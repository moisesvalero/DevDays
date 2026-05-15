import { describe, it, expect } from 'vitest';
import { ej, sec, enunciadoParaIA } from './_helpers';

describe('lesson helpers', () => {
  it('sec incluye analogía y paraQuéSirve', () => {
    const s = sec('Título', 'Analogía', 'Uso real', 'Qué hace');
    expect(s.titulo).toBe('Título');
    expect(s.analogia).toBe('Analogía');
    expect(s.paraQueSirve).toBe('Uso real');
  });

  it('ej incluye enunciado estructurado y criterios', () => {
    const e = ej(
      1,
      'Contador',
      {
        planteamiento: 'Se pide un contador.',
        requisitos: ['Inicialice en 0', 'Muestre el valor'],
        salidaEsperada: '5',
        seccionRef: 'Variables con let',
        notas: 'Véase sección Variables con let.'
      },
      ['Usa let'],
      '// plantilla'
    );
    expect(e.numero).toBe(1);
    expect(e.titulo).toBe('Contador');
    expect(e.enunciado.planteamiento).toContain('contador');
    expect(e.criteriosLogica).toEqual(['Usa let']);
  });

  it('enunciadoParaIA serializa requisitos y salida', () => {
    const texto = enunciadoParaIA({
      planteamiento: 'Problema de prueba.',
      requisitos: ['Haga A', 'Haga B'],
      salidaEsperada: 'ok',
      seccionRef: 'Sección prueba'
    });
    expect(texto).toContain('Problema de prueba');
    expect(texto).toContain('(a) Haga A');
    expect(texto).toContain('Salida esperada');
    expect(texto).toContain('ok');
  });
});
