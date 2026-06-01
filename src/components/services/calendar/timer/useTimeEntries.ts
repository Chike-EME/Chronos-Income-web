import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTimeEntry, fetchAllTimeEntries } from './service';
import {
  ProjectCard,
  UpdateProjectCardPayload,
} from '@/components/types/calendar/type';
import { updateProjectCard } from '../service';

const ALL_ENTRIES_KEY = ['calendar', 'cards'];

export function useProjectCards(date: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ALL_ENTRIES_KEY,
    queryFn: fetchAllTimeEntries,
    staleTime: 1000 * 30,
  });

  const cards = query.data?.[date] ?? [];

  const remove = useMutation({
    mutationFn: deleteTimeEntry,
    onSuccess: (_, id) => {
      queryClient.setQueryData<Record<string, ProjectCard[]>>(
        ALL_ENTRIES_KEY,
        prev => {
          if (!prev) return prev;
          return {
            ...prev,
            [date]: (prev[date] ?? []).filter(c => c.id !== id),
          };
        },
      );
    },
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectCardPayload }) =>
      updateProjectCard(id, payload),
    onSuccess: updated => {
      queryClient.setQueryData<Record<string, ProjectCard[]>>(
        ALL_ENTRIES_KEY,
        prev => {
          if (!prev) return prev;
          return {
            ...prev,
            [date]: (prev[date] ?? []).map(c =>
              c.id === updated.id ? { ...c, ...updated } : c,
            ),
          };
        },
      );
    },
  });

  return { cards, isLoading: query.isLoading, remove, update };
}
