import { ResetPasswordPayload } from '@/components/types/auth/types';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from './service';

interface Options {
  onSuccess: () => void;
  onError: () => void;
}

export function useResetPassword({ onSuccess, onError }: Options) {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess,
    onError,
  });
}
