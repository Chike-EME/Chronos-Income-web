import { CreateClientPayload } from '@/components/types/clients/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from './service';

interface Options {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function useCreateClient({ onSuccess, onError }: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onSuccess();
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });
}
