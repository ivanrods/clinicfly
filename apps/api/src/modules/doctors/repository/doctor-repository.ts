import Doctor from '../../../shared/database/models/doctor';
import type { CreateDoctorDTO } from '../dto/create-doctor-dto';
import type { UpdateDoctorDTO } from '../dto/update-doctor-dto';

class DoctorRepository {
  async createDoctor(doctorData: CreateDoctorDTO): Promise<Doctor> {
    return Doctor.create(doctorData);
  }

  async findAllDoctors(includeInactive: boolean): Promise<Doctor[]> {
    return Doctor.findAll({
      where: includeInactive ? {} : { isActive: true },
      order: [['name', 'ASC']],
    });
  }

  async findDoctorById(id: number): Promise<Doctor | null> {
    return Doctor.findByPk(id);
  }

  async findDoctorByCrm(crm: string): Promise<Doctor | null> {
    return Doctor.findOne({ where: { crm } });
  }

  async findDoctorByEmail(email: string): Promise<Doctor | null> {
    return Doctor.findOne({ where: { email } });
  }

  async updateDoctor(
    id: number,
    updateData: UpdateDoctorDTO,
  ): Promise<Doctor | null> {
    const doctor = await this.findDoctorById(id);

    if (!doctor) {
      return null;
    }

    return doctor.update(updateData);
  }

  async deactivateDoctor(id: number): Promise<boolean> {
    const doctor = await this.findDoctorById(id);

    if (!doctor) {
      return false;
    }

    await doctor.update({ isActive: false });
    return true;
  }
}

export default DoctorRepository;
