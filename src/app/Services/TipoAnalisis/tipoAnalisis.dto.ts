import { z } from 'zod';

const tipoAnalisisSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  descripcion: z.string(),
  costo: z.number().positive(),
});

export const analisisSchema = z.object({
  id: z.number().int().positive(),
  resultado: z.string(),
  fecha: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha inválida',
  }),
  analisis: tipoAnalisisSchema,
});

export const getByIdTipoAnalisisSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoAnalisis: tipoAnalisisSchema,
});

export const getAllTipoAnalisisSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoAnalisisList: z.array(tipoAnalisisSchema),
});

export type GetAllTipoAnalisis = z.infer<typeof getAllTipoAnalisisSchema>;
