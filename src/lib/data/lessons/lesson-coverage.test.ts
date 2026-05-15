import { describe, it, expect } from 'vitest';
import { lessons } from './index';
import { auditarLecciones, formatearInforme } from './lesson-audit';

describe('lesson-coverage', () => {
  it('cada lección y examen cumple la regla 1:1 y glosario de conceptos', () => {
    const issues = auditarLecciones(lessons);
    if (issues.length > 0) {
      expect.fail(formatearInforme(issues));
    }
    expect(issues).toEqual([]);
  });
});
