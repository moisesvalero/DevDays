export type Callout = {
  tipo: 'tip' | 'warning' | 'info';
  texto: string;
};

export type Seccion = {
  titulo: string;
  texto: string;
  ejemplo?: string;
  nota?: Callout;
};

export type ContenidoLeccion = {
  intro: string;
  secciones: Seccion[];
  resumen: string[];
};

export type Ejercicio = {
  numero: number;
  enunciado: string;
  plantilla: string;
};

type Base = {
  dia: number;
  semana: 1 | 2 | 3 | 4 | 5;
  titulo: string;
  objetivo: string;
};

export type LeccionNormal = Base & {
  tipo: 'leccion';
  contenido: ContenidoLeccion;
  ejercicios: [Ejercicio, Ejercicio, Ejercicio];
};

export type LeccionExamen = Base & {
  tipo: 'examen';
  instrucciones: string;
  ejercicios: [Ejercicio, Ejercicio, Ejercicio, Ejercicio, Ejercicio];
};

export type Leccion = LeccionNormal | LeccionExamen;

export type EstadoDia = 'pendiente' | 'completado';

export type FilaProgreso = {
  user_id: string;
  dia: number;
  estado: EstadoDia;
  fecha: string;
};
