import { z } from 'zod';

export const tipoExmanSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string(),
  descripcion: z.string(),
  costo: z.number().positive(),
});

export type CreateTipoExamen = z.infer<typeof tipoExmanSchema>;

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

export type GetByIdTipoExamen = z.infer<typeof getByIdTipoExamenSchema>;

export const getAllTipoExamenSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoExamenList: z.array(tipoExmanSchema),
});

export type GetAllTipoExamen = z.infer<typeof getAllTipoExamenSchema>;
