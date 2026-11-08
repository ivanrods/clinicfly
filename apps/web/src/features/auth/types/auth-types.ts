export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
