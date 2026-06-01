import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProject } from './service';
import { EditProjectPayload } from '@/components/types/clients/types';

interface UseEditProjectOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function useEditProject({ onSuccess, onError }: UseEditProjectOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number } & EditProjectPayload) =>
      editProject(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error.message ?? 'Erro ao editar projeto.');
    },
  });
}
