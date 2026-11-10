export type Gender = 'male' | 'female' | 'other';

export interface PatientResponseDTO {
  id: number;
  name: string;
  cpf: string;
  birthDate: string; // string, não Date (DATEONLY)
  gender: Gender;
  phone: string | null;
  email: string;
  createdAt: string; // ISO string na resposta
  updatedAt: string;
}
