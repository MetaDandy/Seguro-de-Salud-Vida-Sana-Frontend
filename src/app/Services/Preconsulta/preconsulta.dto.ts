import { z } from 'zod';
import { getOnefichaSchema } from '../Ficha/ficha.dto';
import { enfermeroSchema } from '../Enfermero/enfermero.dto';

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
  preconsultaTerminada: z.string().date().optional(),
});

export const getByIdPreconsultaSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  preconsulta: preconsultaSchema,
});

export type GetByIdPreconsulta = z.infer<typeof getByIdPreconsultaSchema>;

export const getAllPreconsultaSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  preconsultaList: z.array(preconsultaSchema),
});

export type GetAllPreconsulta = z.infer<typeof getAllPreconsultaSchema>;
