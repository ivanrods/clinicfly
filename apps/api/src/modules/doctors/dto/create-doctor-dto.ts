export interface CreateDoctorDTO {
  name: string;
  crm: string; // somente dígitos, 4 a 7 posições
  specialty: string;
  phone?: string | null;
  email: string;
}
