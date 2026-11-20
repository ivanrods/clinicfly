export interface Doctor {
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

export interface CreateDoctorPayload {
  name: string;
  crm: string;
  specialty: string;
  phone?: string | null;
  email: string;
}

export type UpdateDoctorPayload = Partial<CreateDoctorPayload> & {
  isActive?: boolean;
};
