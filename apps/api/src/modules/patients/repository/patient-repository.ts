import Patient from '../../../shared/database/models/patient';
import type { CreatePatientDTO } from '../dto/create-patient-dto';
import type { UpdatePatientDTO } from '../dto/update-patient-dto';

class PatientRepository {
  async createPatient(patientData: CreatePatientDTO): Promise<Patient> {
    return Patient.create(patientData);
  }

  async findPatientById(id: number): Promise<Patient | null> {
    return Patient.findByPk(id);
  }

  async updatePatient(
    id: number,
    updateData: UpdatePatientDTO,
  ): Promise<Patient | null> {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return null;
    }
    return patient.update(updateData);
  }

  async deletePatient(id: number): Promise<boolean> {
    const deletedCount = await Patient.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

export default PatientRepository;
