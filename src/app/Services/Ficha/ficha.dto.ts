import { z } from 'zod';

export const createFichaSchema = z.object({
  fechaEmision: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha de emisión inválida.',
  }),
  fechaAtencion: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha de atención inválida.',
  }),
  horaAtencion: z
    .string()
    .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
      message: 'Hora de atención inválida.',
    }),
  ci_paciente: z.number().int().positive(),
  ci_medico: z.number().int().positive(),
  id_especialidad: z.number().int().positive(),
});

export type CreateFicha = z.infer<typeof createFichaSchema>;

export const getOnefichaSchema = z.object({
  id: z.number().int(),
  fechaEmision: z.string(),
  fechaAtencion: z.string(),
  horaAtencion: z.string(),
  ci_paciente: z.number().int(),
  ci_medico: z.number().int(),
  id_especialidad: z.number().int(),
  nombrePaciente: z.string(),
  nombreMedico: z.string(),
  nombreEspecialidad: z.string(),
});

export const getByIdFichaSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  ficha: getOnefichaSchema,
});

export type GetByIdFicha = z.infer<typeof getByIdFichaSchema>;
