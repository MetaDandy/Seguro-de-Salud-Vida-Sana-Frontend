import { z } from 'zod';

export const createTipoInsumoSchema = z.object({
  id: z.number().positive().optional(),
  nombre: z.string(),
  descripcion: z.string(),
});

export type CreateTipoInsumo = z.infer<typeof createTipoInsumoSchema>;

export const getByIdTipoInsumoSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoInsumo: createTipoInsumoSchema,
});

export type GetByIdTipoInsumo = z.infer<typeof getByIdTipoInsumoSchema>;

export const getAllTipoInsumoSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  tipoInsumoList: z.array(createTipoInsumoSchema),
});

export type GetAllTipoInsumo = z.infer<typeof getAllTipoInsumoSchema>;
