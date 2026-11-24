export const APPOINTMENT_STATUSES = [
  'scheduled',
  'confirmed',
  'completed',
  'cancelled',
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export interface CreateAppointmentDTO {
  patientId: number;
  doctorId: number;
  date: string; // 'YYYY-MM-DD' (DATEONLY)
  startTime: string; // 'HH:mm' -> normalizado para 'HH:mm:ss' (TIME)
  endTime: string;
  status?: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
}
