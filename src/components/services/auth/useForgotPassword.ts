import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from './service';

interface Options {
  onSuccess: () => void;
  onError: () => void;
}

export function useForgotPassword({ onSuccess, onError }: Options) {
  return useMutation({
    mutationFn: (email: string) => forgotPassword({ email }),
    onSuccess,
    onError,
  });
}
