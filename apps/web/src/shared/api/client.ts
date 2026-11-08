import axios from 'axios';
import { tokenStorage } from '../lib/token-storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
