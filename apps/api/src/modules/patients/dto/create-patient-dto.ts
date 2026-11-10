export type Gender = 'male' | 'female' | 'other';

export interface CreatePatientDTO {
  name: string;
  cpf: string; // somente dígitos, normalizado na validação
  birthDate: string; // 'YYYY-MM-DD' (DATEONLY)
  gender: Gender;
  phone?: string | null;
  email: string;
}
