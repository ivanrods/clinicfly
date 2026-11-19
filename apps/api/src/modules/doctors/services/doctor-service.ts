import type { CreateDoctorDTO } from '../dto/create-doctor-dto';
import type { UpdateDoctorDTO } from '../dto/update-doctor-dto';
import type Doctor from '../../../shared/database/models/doctor';
import DoctorRepository from '../repository/doctor-repository';
import { AppError } from '../../../shared/errors/app-error';

class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async getDoctorById(doctorId: number): Promise<Doctor | null> {
    return this.doctorRepository.findDoctorById(doctorId);
  }

  async getAllDoctors(includeInactive: boolean): Promise<Doctor[]> {
    return this.doctorRepository.findAllDoctors(includeInactive);
  }

  async createDoctor(doctorData: CreateDoctorDTO): Promise<Doctor> {
    const [crmInUse, emailInUse] = await Promise.all([
      this.doctorRepository.findDoctorByCrm(doctorData.crm),
      this.doctorRepository.findDoctorByEmail(doctorData.email),
    ]);

    if (crmInUse) {
      throw new AppError('CRM já cadastrado', 409);
    }
    if (emailInUse) {
      throw new AppError('E-mail já cadastrado', 409);
    }

    return this.doctorRepository.createDoctor(doctorData);
  }

  async updateDoctor(
    doctorId: number,
    updateData: UpdateDoctorDTO,
  ): Promise<Doctor | null> {
    const doctor = await this.doctorRepository.findDoctorById(doctorId);
    if (!doctor) {
      return null;
    }

    if (updateData.crm && updateData.crm !== doctor.crm) {
      const crmInUse = await this.doctorRepository.findDoctorByCrm(
        updateData.crm,
      );
      if (crmInUse) {
        throw new AppError('CRM já cadastrado', 409);
      }
    }

    if (updateData.email && updateData.email !== doctor.email) {
      const emailInUse = await this.doctorRepository.findDoctorByEmail(
        updateData.email,
      );
      if (emailInUse) {
        throw new AppError('E-mail já cadastrado', 409);
      }
    }

    return this.doctorRepository.updateDoctor(doctorId, updateData);
  }

  async deleteDoctor(doctorId: number): Promise<boolean> {
    return this.doctorRepository.deactivateDoctor(doctorId);
  }
}

export { DoctorService };
export default new DoctorService(new DoctorRepository());
