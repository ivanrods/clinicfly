import type { CreateDoctorDTO } from './create-doctor-dto';

export type UpdateDoctorDTO = Partial<CreateDoctorDTO> & {
  isActive?: boolean;
};
