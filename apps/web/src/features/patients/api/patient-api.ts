import { api } from '../../../shared/api/client';
import type {
  CreatePatientPayload,
  Patient,
  UpdatePatientPayload,
} from '../types/patient-types';

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function normalizePhone(phone?: string | null): string | null {
  const digits = phone ? onlyDigits(phone) : '';

  return digits.length > 0 ? digits : null;
}

function normalizeCreatePayload(
  payload: CreatePatientPayload,
): CreatePatientPayload {
  return {
    ...payload,
    cpf: onlyDigits(payload.cpf),
    phone: normalizePhone(payload.phone),
  };
}

function normalizeUpdatePayload(
  payload: UpdatePatientPayload,
): UpdatePatientPayload {
  const normalized: UpdatePatientPayload = { ...payload };

  if (typeof normalized.cpf === 'string') {
    normalized.cpf = onlyDigits(normalized.cpf);
  }

  if ('phone' in normalized) {
    normalized.phone = normalizePhone(normalized.phone);
  }

  return normalized;
}

export const patientApi = {
  async getById(id: number): Promise<Patient> {
    const { data } = await api.get<Patient>(`/patients/${id}`);
    return data;
  },

  async create(payload: CreatePatientPayload): Promise<Patient> {
    const { data } = await api.post<Patient>(
      '/patients',
      normalizeCreatePayload(payload),
    );
    return data;
  },

  async update(id: number, payload: UpdatePatientPayload): Promise<Patient> {
    const { data } = await api.patch<Patient>(
      `/patients/${id}`,
      normalizeUpdatePayload(payload),
    );
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/patients/${id}`);
  },
};
