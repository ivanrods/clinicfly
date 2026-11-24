import type { Request, Response } from 'express';
import { toAppointmentResponse } from '../mappers/appointment-mapper';
import appointmentService from '../services/appointment-service';
import {
  appointmentIdSchema,
  createAppointmentSchema,
  listAppointmentsQuerySchema,
  updateAppointmentSchema,
} from '../validation/appointment-validation';

class AppointmentController {
  async getAll(req: Request, res: Response) {
    const filters = listAppointmentsQuerySchema.parse(req.query);
    const appointments = await appointmentService.getAllAppointments(filters);

    return res
      .status(200)
      .json(
        appointments.map((appointment) => toAppointmentResponse(appointment)),
      );
  }

  async getById(req: Request, res: Response) {
    const appointmentId = appointmentIdSchema.parse(req.params.id);
    const appointment =
      await appointmentService.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    return res.status(200).json(toAppointmentResponse(appointment));
  }

  async create(req: Request, res: Response) {
    const data = createAppointmentSchema.parse(req.body);
    const appointment = await appointmentService.createAppointment(data);

    return res.status(201).json(toAppointmentResponse(appointment));
  }

  async update(req: Request, res: Response) {
    const appointmentId = appointmentIdSchema.parse(req.params.id);
    const data = updateAppointmentSchema.parse(req.body);

    const appointment = await appointmentService.updateAppointment(
      appointmentId,
      data,
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    return res.status(200).json(toAppointmentResponse(appointment));
  }

  async remove(req: Request, res: Response) {
    const appointmentId = appointmentIdSchema.parse(req.params.id);
    const deleted = await appointmentService.deleteAppointment(appointmentId);

    if (!deleted) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    return res.status(204).send();
  }
}

export default new AppointmentController();
