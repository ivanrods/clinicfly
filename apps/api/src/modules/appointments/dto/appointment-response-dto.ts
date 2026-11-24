import type { DoctorResponseDTO } from '../../doctors/dto/doctor-response-dto';
import type { PatientResponseDTO } from '../../patients/dto/patient-response-dto';
import type { AppointmentStatus } from './create-appointment-dto';

export interface AppointmentResponseDTO {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  reason: string | null;
  notes: string | null;
  patient?: PatientResponseDTO;
  doctor?: DoctorResponseDTO;
  createdAt: string;
  updatedAt: string;
}
