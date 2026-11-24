import { Op } from 'sequelize';
import type { Includeable, WhereOptions } from 'sequelize';
import Appointment from '../../../shared/database/models/appointment';
import Doctor from '../../../shared/database/models/doctor';
import Patient from '../../../shared/database/models/patient';
import type { AppointmentStatus } from '../dto/create-appointment-dto';
import type { CreateAppointmentDTO } from '../dto/create-appointment-dto';
import type { UpdateAppointmentDTO } from '../dto/update-appointment-dto';

export interface ListAppointmentsFilters {
  date?: string;
  startDate?: string;
  endDate?: string;
  doctorId?: number;
  patientId?: number;
  status?: AppointmentStatus;
}

const appointmentIncludes: Includeable[] = [
  { model: Patient, as: 'patient' },
  { model: Doctor, as: 'doctor' },
];

class AppointmentRepository {
  async createAppointment(
    appointmentData: CreateAppointmentDTO,
  ): Promise<Appointment> {
    return Appointment.create(appointmentData);
  }

  async findAllAppointments(
    filters: ListAppointmentsFilters = {},
  ): Promise<Appointment[]> {
    const where: WhereOptions = {};

    if (filters.date) {
      where.date = filters.date;
    }
    if (filters.doctorId) {
      where.doctorId = filters.doctorId;
    }
    if (filters.patientId) {
      where.patientId = filters.patientId;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.startDate && filters.endDate) {
      where.date = { [Op.between]: [filters.startDate, filters.endDate] };
    } else if (filters.startDate) {
      where.date = { [Op.gte]: filters.startDate };
    } else if (filters.endDate) {
      where.date = { [Op.lte]: filters.endDate };
    }

    return Appointment.findAll({
      where,
      include: appointmentIncludes,
      order: [
        ['date', 'ASC'],
        ['startTime', 'ASC'],
      ],
    });
  }

  async findAppointmentById(id: number): Promise<Appointment | null> {
    return Appointment.findByPk(id, { include: appointmentIncludes });
  }

  async findOverlappingAppointment({
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
  }): Promise<Appointment | null> {
    return Appointment.findOne({
      where: {
        doctorId,
        date,
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
        ...(ignoreId !== undefined && { id: { [Op.ne]: ignoreId } }),
      },
    });
  }

  async updateAppointment(
    id: number,
    updateData: UpdateAppointmentDTO,
  ): Promise<Appointment | null> {
    const appointment = await this.findAppointmentById(id);

    if (!appointment) {
      return null;
    }

    return appointment.update(updateData);
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const deletedCount = await Appointment.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

export default AppointmentRepository;
