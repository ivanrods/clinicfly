import { toDoctorResponse } from '../../doctors/mappers/doctor-mapper';
import { toPatientResponse } from '../../patients/mappers/patient-mapper';
import type Appointment from '../../../shared/database/models/appointment';
import type { AppointmentResponseDTO } from '../dto/appointment-response-dto';

export function toAppointmentResponse(
  appointment: Appointment,
): AppointmentResponseDTO {
  return {
    id: appointment.id,
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    date: appointment.date,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    status: appointment.status,
    reason: appointment.reason,
    notes: appointment.notes,
    patient: appointment.patient
      ? toPatientResponse(appointment.patient)
      : undefined,
    doctor: appointment.doctor
      ? toDoctorResponse(appointment.doctor)
      : undefined,
    createdAt: appointment.createdAt.toISOString(),
    updatedAt: appointment.updatedAt.toISOString(),
  };
}
