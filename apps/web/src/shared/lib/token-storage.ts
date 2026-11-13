const TOKEN_KEY = 'clinicfly.auth.token';
const USER_KEY = 'clinicfly.auth.user';

export interface SessionUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthSession {
  token: string;
  user: SessionUser;
}

function isSessionUser(value: unknown): value is SessionUser {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string'
  );
}

function readUser(): SessionUser | null {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isSessionUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export const tokenStorage = {
  get: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  set: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getUser: (): SessionUser | null => {
    return readUser();
  },
  setUser: (user: SessionUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getSession: (): AuthSession | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = readUser();

    return token && user ? { token, user } : null;
  },
  setSession: (session: AuthSession): void => {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  },
  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
