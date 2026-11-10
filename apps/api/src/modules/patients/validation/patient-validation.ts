import { z } from 'zod';

export const createPatientSchema = z.object({
  name: z.string().min(2).max(100),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  birthDate: z.iso.date(),
  gender: z.enum(['male', 'female', 'other']),
  phone: z
    .string()
    .regex(/^\d{10,11}$/)
    .nullish(),
  email: z.email(),
});

export const updatePatientSchema = createPatientSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo',
  });

export const patientIdSchema = z.coerce.number().int().positive();
