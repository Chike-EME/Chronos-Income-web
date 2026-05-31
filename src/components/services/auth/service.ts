import { LoginPayload, LoginResponse } from '@/components/types/auth/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message ?? 'Credenciais inválidas');
  }

  return response.json();
}
