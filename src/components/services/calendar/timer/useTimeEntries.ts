import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteTimeEntry,
  fetchAllTimeEntries,
  updateTimeEntry,
} from './service';
import {
  ProjectCard,
  UpdateProjectCardPayload,
  UpdateProjectCardResponse,
} from '@/components/types/calendar/type';

const ALL_ENTRIES_KEY = ['calendar', 'cards'];

export function useProjectCards(date: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ALL_ENTRIES_KEY,
    queryFn: fetchAllTimeEntries,
    staleTime: 1000 * 30,
  });

  const cards = query.data?.[date] ?? [];

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ALL_ENTRIES_KEY });
  }

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
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProjectCardPayload;
    }) => updateTimeEntry(id, payload),
    onSuccess: (updated: UpdateProjectCardResponse) => {
      queryClient.invalidateQueries({ queryKey: ALL_ENTRIES_KEY });
    },
  });

  return { cards, isLoading: query.isLoading, remove, update, invalidate };
}
