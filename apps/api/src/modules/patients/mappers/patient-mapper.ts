import type Patient from '../../../shared/database/models/patient';
import type { PatientResponseDTO } from '../dto/patient-response-dto';

export function toPatientResponse(patient: Patient): PatientResponseDTO {
  return {
    id: patient.id,
    name: patient.name,
    cpf: patient.cpf,
    birthDate: patient.birthDate,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    createdAt: patient.createdAt.toISOString(),
    updatedAt: patient.updatedAt.toISOString(),
  };
}
