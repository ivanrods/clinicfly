import type { CreatePatientDTO } from '../dto/create-patient-dto';
import type { UpdatePatientDTO } from '../dto/update-patient-dto';
import type Patient from '../../../shared/database/models/patient';
import PatientRepository from '../repository/patient-repository';
import { AppError } from '../../../shared/errors/app-error';

class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getPatientById(patientId: number): Promise<Patient | null> {
    return this.patientRepository.findPatientById(patientId);
  }

  async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
    const [cpfInUse, emailInUse] = await Promise.all([
      this.patientRepository.findPatientByCpf(patientData.cpf),
      this.patientRepository.findPatientByEmail(patientData.email),
    ]);

    if (cpfInUse) {
      throw new AppError('CPF já cadastrado', 409);
    }
    if (emailInUse) {
      throw new AppError('E-mail já cadastrado', 409);
    }

    return this.patientRepository.createPatient(patientData);
  }

  async updatePatient(
    patientId: number,
    updateData: UpdatePatientDTO,
  ): Promise<Patient | null> {
    const patient = await this.patientRepository.findPatientById(patientId);
    if (!patient) {
      return null;
    }

    if (updateData.cpf && updateData.cpf !== patient.cpf) {
      const cpfInUse = await this.patientRepository.findPatientByCpf(
        updateData.cpf,
      );
      if (cpfInUse) {
        throw new AppError('CPF já cadastrado', 409);
      }
    }

    if (updateData.email && updateData.email !== patient.email) {
      const emailInUse = await this.patientRepository.findPatientByEmail(
        updateData.email,
      );
      if (emailInUse) {
        throw new AppError('E-mail já cadastrado', 409);
      }
    }

    return this.patientRepository.updatePatient(patientId, updateData);
  }

  async deletePatient(patientId: number): Promise<boolean> {
    return this.patientRepository.deletePatient(patientId);
  }
}

export { PatientService };
export default new PatientService(new PatientRepository());
