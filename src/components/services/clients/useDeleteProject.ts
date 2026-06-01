import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from './service';

interface UseDeleteProjectOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function useDeleteProject({
  onSuccess,
  onError,
}: UseDeleteProjectOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error.message ?? 'Erro ao excluir projeto.');
    },
  });
}
