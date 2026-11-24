import { z } from 'zod';
import { APPOINTMENT_STATUSES } from '../dto/create-appointment-dto';

const timeSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/,
    'Horário deve estar no formato HH:mm',
  )
  .transform((value) => (value.length === 5 ? `${value}:00` : value));

const appointmentFields = z.object({
  patientId: z.coerce.number().int().positive(),
  doctorId: z.coerce.number().int().positive(),
  date: z.iso.date(),
  startTime: timeSchema,
  endTime: timeSchema,
  status: z.enum(APPOINTMENT_STATUSES).optional(),
  reason: z.string().max(500).nullish(),
  notes: z.string().max(1000).nullish(),
});

export const createAppointmentSchema = appointmentFields
  .extend({ status: z.enum(APPOINTMENT_STATUSES).default('scheduled') })
  .refine((data) => data.startTime < data.endTime, {
    message: 'endTime deve ser maior que startTime',
    path: ['endTime'],
  });

export const updateAppointmentSchema = appointmentFields
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo',
  })
  .refine(
    (data) => !data.startTime || !data.endTime || data.startTime < data.endTime,
    { message: 'endTime deve ser maior que startTime', path: ['endTime'] },
  );

export const appointmentIdSchema = z.coerce.number().int().positive();

export const listAppointmentsQuerySchema = z
  .object({
    date: z.iso.date().optional(),
    startDate: z.iso.date().optional(),
    endDate: z.iso.date().optional(),
    doctorId: z.coerce.number().int().positive().optional(),
    patientId: z.coerce.number().int().positive().optional(),
    status: z.enum(APPOINTMENT_STATUSES).optional(),
  })
  .refine(
    (query) =>
      !query.startDate || !query.endDate || query.startDate <= query.endDate,
    {
      message: 'startDate deve ser menor ou igual a endDate',
      path: ['endDate'],
    },
  );
