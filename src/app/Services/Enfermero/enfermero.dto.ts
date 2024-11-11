import { z } from 'zod';

export const enfermeroSchema = z.object({
  ci: z.number().int(),
  name: z.string(),
  age: z.number().int(),
  birthDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: 'Fecha de nacimiento inválida',
  }),
  email: z.string().email(),
});
