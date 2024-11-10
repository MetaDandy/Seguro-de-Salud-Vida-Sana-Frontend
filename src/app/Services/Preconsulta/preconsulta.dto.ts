import { z } from 'zod';
import { getOnefichaSchema } from '../Ficha/ficha.dto';

export const createPreconsultaSchema = z.object({
  estado: z.string(),
  peso: z.number(),
  altura: z.number(),
  edad: z.number(),
  sexo: z.string(),
  presion: z.string(),
  ci_enferemero: z.number().int().positive(),
  id_Ficha: z.number(),
});

export type CreatePreconsulta = z.infer<typeof createPreconsultaSchema>;

const enfermeroSchema = z.object({
  ci: z.number().int(),
  name: z.string(),
  age: z.number().int(),
  birthDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha de nacimiento inválida',
  }),
  email: z.string().email(),
});

const preconsultaSchema = z.object({
  id: z.number().int(),
  estado: z.string(),
  peso: z.number(),
  altura: z.number(),
  edad: z.number().int(),
  sexo: z.string(),
  presion: z.string(),
  ci_enferemero: z.number().int(),
  id_Ficha: z.number().int(),
  nombreEnfermero: z.string(),
  enfermero: enfermeroSchema,
  ficha: getOnefichaSchema,
});

export const getByIdPreconsultaSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  preconsulta: preconsultaSchema,
});

export type GetByIdPreconsulta = z.infer<typeof getByIdPreconsultaSchema>;
