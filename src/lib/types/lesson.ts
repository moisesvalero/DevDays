export type Ejercicio = {
  numero: 1 | 2 | 3;
  enunciado: string;
  plantilla: string;
};

export type Leccion = {
  dia: number;
  semana: 1 | 2 | 3 | 4 | 5;
  titulo: string;
  objetivo: string;
  explicacion: string;
  ejercicios: [Ejercicio, Ejercicio, Ejercicio];
};

export type EstadoDia = 'pendiente' | 'completado';

export type FilaProgreso = {
  user_id: string;
  dia: number;
  estado: EstadoDia;
  fecha: string;
};
