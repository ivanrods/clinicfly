import type Appointment from '../../../shared/database/models/appointment';
import { AppError } from '../../../shared/errors/app-error';
import DoctorRepository from '../../doctors/repository/doctor-repository';
import PatientRepository from '../../patients/repository/patient-repository';
import type { CreateAppointmentDTO } from '../dto/create-appointment-dto';
import type { UpdateAppointmentDTO } from '../dto/update-appointment-dto';
import AppointmentRepository, {
  type ListAppointmentsFilters,
} from '../repository/appointment-repository';

class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async getAppointmentById(appointmentId: number): Promise<Appointment | null> {
    return this.appointmentRepository.findAppointmentById(appointmentId);
  }

  async getAllAppointments(
    filters: ListAppointmentsFilters = {},
  ): Promise<Appointment[]> {
    return this.appointmentRepository.findAllAppointments(filters);
  }

  async createAppointment(
    appointmentData: CreateAppointmentDTO,
  ): Promise<Appointment> {
    await Promise.all([
      this.ensurePatientExists(appointmentData.patientId),
      this.ensureDoctorExists(appointmentData.doctorId),
    ]);

    await this.ensureNoConflict({
      doctorId: appointmentData.doctorId,
      date: appointmentData.date,
      startTime: appointmentData.startTime,
      endTime: appointmentData.endTime,
    });

    return this.appointmentRepository.createAppointment(appointmentData);
  }

  async updateAppointment(
    appointmentId: number,
    updateData: UpdateAppointmentDTO,
  ): Promise<Appointment | null> {
    const appointment =
      await this.appointmentRepository.findAppointmentById(appointmentId);

    if (!appointment) {
      return null;
    }

    if (
      updateData.patientId !== undefined &&
      updateData.patientId !== appointment.patientId
    ) {
      await this.ensurePatientExists(updateData.patientId);
    }

    if (
      updateData.doctorId !== undefined &&
      updateData.doctorId !== appointment.doctorId
    ) {
      await this.ensureDoctorExists(updateData.doctorId);
    }

    await this.ensureNoConflict({
      doctorId: updateData.doctorId ?? appointment.doctorId,
      date: updateData.date ?? appointment.date,
      startTime: updateData.startTime ?? appointment.startTime,
      endTime: updateData.endTime ?? appointment.endTime,
      ignoreId: appointmentId,
    });

    return this.appointmentRepository.updateAppointment(
      appointmentId,
      updateData,
    );
  }

  async deleteAppointment(appointmentId: number): Promise<boolean> {
    return this.appointmentRepository.deleteAppointment(appointmentId);
  }

  private async ensurePatientExists(patientId: number): Promise<void> {
    const patient = await this.patientRepository.findPatientById(patientId);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404);
    }
  }

  private async ensureDoctorExists(doctorId: number): Promise<void> {
    const doctor = await this.doctorRepository.findDoctorById(doctorId);

    if (!doctor) {
      throw new AppError('Médico não encontrado', 404);
    }
    if (!doctor.isActive) {
      throw new AppError('Médico inativo', 409);
    }
  }

  private async ensureNoConflict({
    doctorId,
    date,
    startTime,
    endTime,
    ignoreId,
  }: {
    doctorId: number;
    date: string;
    startTime: string;
    endTime: string;
    ignoreId?: number;
  }): Promise<void> {
    const conflict =
      await this.appointmentRepository.findOverlappingAppointment({
        doctorId,
        date,
        startTime,
        endTime,
        ignoreId,
      });

    if (conflict) {
      throw new AppError('Horário já ocupado para este médico', 409);
    }
  }
}

export { AppointmentService };
export default new AppointmentService(
  new AppointmentRepository(),
  new PatientRepository(),
  new DoctorRepository(),
);
