import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(2).max(100),
  crm: z.string().regex(/^\d{4,7}$/, 'CRM deve conter de 4 a 7 dígitos'),
  specialty: z.string().min(2).max(100),
  phone: z
    .string()
    .regex(/^\d{10,11}$/)
    .nullish(),
  email: z.email(),
});

export const updateDoctorSchema = createDoctorSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo',
  });

export const doctorIdSchema = z.coerce.number().int().positive();

export const listDoctorsQuerySchema = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');
