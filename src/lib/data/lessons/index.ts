import type { Leccion } from '$lib/types/lesson';
import { week1 } from './week1';
import { week2 } from './week2';
import { week3 } from './week3';
import { week4 } from './week4';
import { week5 } from './week5';

export const lessons: Leccion[] = [...week1, ...week2, ...week3, ...week4, ...week5];
