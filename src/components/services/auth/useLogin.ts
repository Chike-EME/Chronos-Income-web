import { LoginPayload, LoginResponse } from '@/components/types/auth/types';
import { useMutation } from '@tanstack/react-query';
import { login } from './service';

interface UseLoginOptions {
  onSuccess: (data: LoginResponse) => void;
  onError: () => void;
}

export function useLogin({ onSuccess, onError }: UseLoginOptions) {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess,
    onError,
  });
}
