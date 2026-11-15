import { z } from 'zod';

export const createPatientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  cpf: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, '').length === 11, {
      message: 'CPF deve ter 11 dígitos',
    }),
  birthDate: z.iso.date('Data de nascimento inválida'),
  gender: z.enum(['male', 'female', 'other'], 'Informe o gênero'),
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

export const updatePatientSchema = createPatientSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo',
  });

export type PatientFormValues = z.infer<typeof createPatientSchema>;
export type UpdatePatientFormValues = z.infer<typeof updatePatientSchema>;
