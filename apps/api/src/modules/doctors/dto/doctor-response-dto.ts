export interface DoctorResponseDTO {
  id: number;
  name: string;
  crm: string;
  specialty: string;
  phone: string | null;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
