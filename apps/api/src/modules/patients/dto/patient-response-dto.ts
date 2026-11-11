import type { Gender } from './create-patient-dto';

export interface PatientResponseDTO {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  gender: Gender;
  phone: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}
