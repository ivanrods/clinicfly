export type Gender = 'male' | 'female' | 'other';

export interface Patient {
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

export interface CreatePatientPayload {
  name: string;
  cpf: string;
  birthDate: string;
  gender: Gender;
  phone?: string | null;
  email: string;
}

export type UpdatePatientPayload = Partial<CreatePatientPayload>;
