import { z } from 'zod';
import { enfermeroSchema } from '../Enfermero/enfermero.dto';
import { getOnefichaSchema } from '../Ficha/ficha.dto';
import { examenSchema } from '../TipoExamen/tipoExamen.dto';
import { analisisSchema } from '../TipoAnalisis/tipoAnalisis.dto';

const createExamenSchema = z.object({
  id_tipoExamen: z.number().int().positive(),
  resultado: z.string(),
  fecha: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha inválida',
  }),
});

const CreateAnalisisSchema = z.object({
  id_tipoAnalisis: z.number().int().positive(),
  resultado: z.string(),
  fecha: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha inválida',
  }),
});

export const createConsultaSchema = z.object({
  fecha: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha inválida',
  }),
  diagnostico: z.string(),
  id_preconsulta: z.number().int().positive(),
  examen: z.array(createExamenSchema),
  analisis: z.array(CreateAnalisisSchema),
});

export type CreateConsulta = z.infer<typeof createConsultaSchema>;

const preconsultaSchema = z.object({
  id: z.number().int().positive(),
  estado: z.string(),
  peso: z.number().positive(),
  altura: z.number().positive(),
  edad: z.number().int().positive(),
  sexo: z.string(),
  presion: z.string(),
  enfermero: enfermeroSchema,
  ci_enferemero: z.number().int().positive(),
  ficha: getOnefichaSchema,
  id_Ficha: z.number().int().positive(),
  nombreEnfermero: z.string(),
});

const consultaSchema = z.object({
  id: z.number().int().positive(),
  fecha: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha inválida',
  }),
  diagnostico: z.string(),
  id_preconsulta: z.number().int().positive(),
  preconsultaDto: preconsultaSchema,
  examen: z.array(examenSchema),
  analisis: z.array(analisisSchema),
  consultaTerminada: z.string().date().optional(),
});

export const getByIdConsultaSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  consulta: consultaSchema,
});

export type GetByIdConsulta = z.infer<typeof getByIdConsultaSchema>;

export const getAllConsultaSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
  consultaList: z.array(consultaSchema),
});

export type GetAllConsulta = z.infer<typeof getAllConsultaSchema>;
