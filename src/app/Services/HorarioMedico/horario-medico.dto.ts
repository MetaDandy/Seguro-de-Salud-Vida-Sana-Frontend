import { z } from 'zod';

const horarioSchema = z.object({
  id: z.number(),
  horaInicio: z.string(),
  horaFin: z.string(),
  dia: z.enum([
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
  ]),
});

export const horarioMedicoSchema = z.object({
  ci_medico: z.number(),
  id_especialidad: z.number(),
  nombreMedico: z.string(),
  nombreEspecialidad: z.string(),
  id_horarios: z.array(z.number()), // Lista de IDs de horarios
  horarios: z.array(horarioSchema), // Lista de objetos de horarios
});

export const getHorarioMedicoSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(), // En una validación más avanzada, podrías validar que sea una fecha válida
  horarioMedicoList: z.array(horarioMedicoSchema), // Lista de horarios médicos
});

export type GetHorarioMedico = z.infer<typeof getHorarioMedicoSchema>;
