const API_URL = 'http://localhost:3000/';

export async function login(email: string, password: string): Promise<any> {
  const response = await fetch(`${API_URL}login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<any> {
  const response = await fetch(`${API_URL}register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}
