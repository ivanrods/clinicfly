import type { Request, Response } from 'express';
import doctorService from '../services/doctor-service';
import {
  createDoctorSchema,
  doctorIdSchema,
  listDoctorsQuerySchema,
  updateDoctorSchema,
} from '../validation/doctor-validation';
import { toDoctorResponse } from '../mappers/doctor-mapper';

class DoctorController {
  async getAll(req: Request, res: Response) {
    const { includeInactive } = listDoctorsQuerySchema.parse(req.query);
    const doctors = await doctorService.getAllDoctors(includeInactive);

    return res
      .status(200)
      .json(doctors.map((doctor) => toDoctorResponse(doctor)));
  }

  async getById(req: Request, res: Response) {
    const doctorId = doctorIdSchema.parse(req.params.id);
    const doctor = await doctorService.getDoctorById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    return res.status(200).json(toDoctorResponse(doctor));
  }

  async create(req: Request, res: Response) {
    const data = createDoctorSchema.parse(req.body);
    const doctor = await doctorService.createDoctor(data);

    return res.status(201).json(toDoctorResponse(doctor));
  }

  async update(req: Request, res: Response) {
    const doctorId = doctorIdSchema.parse(req.params.id);
    const data = updateDoctorSchema.parse(req.body);

    const doctor = await doctorService.updateDoctor(doctorId, data);
    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    return res.status(200).json(toDoctorResponse(doctor));
  }

  async remove(req: Request, res: Response) {
    const doctorId = doctorIdSchema.parse(req.params.id);
    const deleted = await doctorService.deleteDoctor(doctorId);

    if (!deleted) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    return res.status(204).send();
  }
}

export default new DoctorController();
