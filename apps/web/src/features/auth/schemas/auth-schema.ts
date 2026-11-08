import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Informe um e-mail válido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(50, 'A senha deve ter no máximo 50 caracteres'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'O nome deve ter no mínimo 2 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caracteres'),
    email: z.email('Informe um e-mail válido'),
    password: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
