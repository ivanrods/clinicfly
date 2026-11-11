import type { Request, Response } from 'express';
import patientService from '../services/patient-service';
import {
  createPatientSchema,
  patientIdSchema,
  updatePatientSchema,
} from '../validation/patient-validation';
import { toPatientResponse } from '../mappers/patient-mapper';

class PatientController {
  async getById(req: Request, res: Response) {
    const patientId = patientIdSchema.parse(req.params.id);
    const patient = await patientService.getPatientById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    return res.status(200).json(toPatientResponse(patient));
  }

  async create(req: Request, res: Response) {
    const data = createPatientSchema.parse(req.body);
    const patient = await patientService.createPatient(data);

    return res.status(201).json(toPatientResponse(patient));
  }

  async update(req: Request, res: Response) {
    const patientId = patientIdSchema.parse(req.params.id);
    const data = updatePatientSchema.parse(req.body);

    const patient = await patientService.updatePatient(patientId, data);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    return res.status(200).json(toPatientResponse(patient));
  }

  async remove(req: Request, res: Response) {
    const patientId = patientIdSchema.parse(req.params.id);
    const deleted = await patientService.deletePatient(patientId);

    if (!deleted) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    return res.status(204).send();
  }
}

export default new PatientController();
