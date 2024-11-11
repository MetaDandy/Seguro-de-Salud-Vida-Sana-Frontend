import { z } from 'zod';

const tipoExmanSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  descripcion: z.string(),
  costo: z.number().positive(),
});

export const examenSchema = z.object({
  id: z.number().int().positive(),
  resultado: z.string(),
  fecha: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha inválida',
  }),
  examen: tipoExmanSchema,
});

export const getByIdTipoExamenSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoExamen: tipoExmanSchema,
});

export const getAllTipoExamenSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoExamenList: z.array(tipoExmanSchema),
});

export type GetAllTipoExamen = z.infer<typeof getAllTipoExamenSchema>;
