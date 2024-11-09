import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Correo electronico invalido')
    .min(1, 'El correo electronico es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const LoginResponseSchema = z.object({
  expirationTime: z.string(),
  message: z.string(),
  status: z.number(),
  timestamp: z.string(),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
