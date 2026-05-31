import {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
} from '@/components/types/auth/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message ?? 'Erro na requisição');
  }

  // logout e forgot-password podem retornar 204 (sem body)
  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', payload);
}

export async function logout(token: string): Promise<void> {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<void> {
  return request<void>('/auth/forgot-password', payload);
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<void> {
  return request<void>('/auth/reset-password', payload);
}
