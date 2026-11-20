import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  crm: z
    .string()
    .trim()
    .refine((value) => /^\d{4,7}$/.test(value.replace(/\D/g, '')), {
      message: 'CRM deve conter de 4 a 7 dígitos',
    }),
  specialty: z
    .string()
    .trim()
    .min(2, 'A especialidade deve ter no mínimo 2 caracteres')
    .max(100, 'A especialidade deve ter no máximo 100 caracteres'),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^\d{10,11}$/.test(value.replace(/\D/g, '')),
      {
        message: 'Telefone deve ter 10 ou 11 dígitos',
      },
    )
    .optional(),
  email: z.email('Informe um e-mail válido'),
});

export const doctorFormSchema = createDoctorSchema.extend({
  isActive: z.boolean().optional(),
});

export const updateDoctorSchema = createDoctorSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo',
  });

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;
export type UpdateDoctorFormValues = z.infer<typeof updateDoctorSchema>;
