import { api } from '../../../shared/api/client';
import type {
  CreateDoctorPayload,
  Doctor,
  UpdateDoctorPayload,
} from '../types/doctor-types';

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function normalizeCrm(crm: string): string {
  return onlyDigits(crm);
}

function normalizePhone(phone?: string | null): string | null {
  const digits = phone ? onlyDigits(phone) : '';

  return digits.length > 0 ? digits : null;
}

function normalizeCreatePayload(
  payload: CreateDoctorPayload,
): CreateDoctorPayload {
  return {
    ...payload,
    crm: normalizeCrm(payload.crm),
    phone: normalizePhone(payload.phone),
  };
}

function normalizeUpdatePayload(
  payload: UpdateDoctorPayload,
): UpdateDoctorPayload {
  const normalized: UpdateDoctorPayload = { ...payload };

  if (typeof normalized.crm === 'string') {
    normalized.crm = normalizeCrm(normalized.crm);
  }

  if ('phone' in normalized) {
    normalized.phone = normalizePhone(normalized.phone);
  }

  return normalized;
}

export const doctorApi = {
  async getAll(includeInactive = false): Promise<Doctor[]> {
    const { data } = await api.get<Doctor[]>('/doctors', {
      params: { includeInactive: String(includeInactive) },
    });
    return data;
  },

  async getById(id: number): Promise<Doctor> {
    const { data } = await api.get<Doctor>(`/doctors/${id}`);
    return data;
  },

  async create(payload: CreateDoctorPayload): Promise<Doctor> {
    const { data } = await api.post<Doctor>(
      '/doctors',
      normalizeCreatePayload(payload),
    );
    return data;
  },

  async update(id: number, payload: UpdateDoctorPayload): Promise<Doctor> {
    const { data } = await api.patch<Doctor>(
      `/doctors/${id}`,
      normalizeUpdatePayload(payload),
    );
    return data;
  },

  async deactivate(id: number): Promise<void> {
    await api.delete(`/doctors/${id}`);
  },
};
