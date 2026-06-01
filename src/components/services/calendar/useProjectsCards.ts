import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProjectCardsByDate,
  deleteProjectCard,
  updateProjectCard,
} from './service';
import {
  ProjectCard,
  UpdateProjectCardPayload,
} from '@/components/types/calendar/type';

export function useProjectCards(date: string) {
  const queryClient = useQueryClient();
  const queryKey = ['calendar', 'cards', date];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchProjectCardsByDate(date),
    staleTime: 1000 * 60,
  });

  const remove = useMutation({
    mutationFn: deleteProjectCard,
    onSuccess: (_, id) => {
      queryClient.setQueryData<ProjectCard[]>(queryKey, prev =>
        (prev ?? []).filter(c => c.id !== id),
      );
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProjectCardPayload;
    }) => updateProjectCard(id, payload),
    onSuccess: updated => {
      queryClient.setQueryData<ProjectCard[]>(queryKey, prev =>
        (prev ?? []).map(c => (c.id === updated.id ? { ...c, ...updated } : c)),
      );
    },
  });

  return {
    cards: query.data ?? [],
    isLoading: query.isLoading,
    remove,
    update,
  };
}
