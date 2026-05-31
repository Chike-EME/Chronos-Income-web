import { CreateProjectPayload } from '@/components/types/clients/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from './service';

interface Options {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function useCreateProject({ onSuccess, onError }: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onSuccess();
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });
}
