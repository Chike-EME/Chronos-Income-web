import { localStorageKeys } from '@/utils/localStorageKeys';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: Method;
  body?: unknown;
}

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = localStorage.getItem(localStorageKeys.accessToken);
  const { method = 'GET', body } = options;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const text = await response.text();
    let message = 'Erro na requisição';
    try {
      const error = JSON.parse(text);
      message = error?.error ?? error?.message ?? message;
    } catch {
      message = text || message;
    }
    throw new Error(message);
  }

  const text = await response.text();
  if (!text || (!text.trim().startsWith('{') && !text.trim().startsWith('['))) {
    return {} as T;
  }

  return JSON.parse(text);
}
