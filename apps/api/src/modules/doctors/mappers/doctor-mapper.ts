import type Doctor from '../../../shared/database/models/doctor';
import { DoctorResponseDTO } from '../dto/doctor-response-dto';

export function toDoctorResponse(doctor: Doctor): DoctorResponseDTO {
  return {
    id: doctor.id,
    name: doctor.name,
    crm: doctor.crm,
    specialty: doctor.specialty,
    phone: doctor.phone,
    email: doctor.email,
    isActive: doctor.isActive,
    createdAt: doctor.createdAt.toISOString(),
    updatedAt: doctor.updatedAt.toISOString(),
  };
}
