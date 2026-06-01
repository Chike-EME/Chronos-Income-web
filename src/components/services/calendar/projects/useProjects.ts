import { useQuery } from '@tanstack/react-query';
import { fetchProjectDetails, fetchProjectOptions } from '../service';

export function useProjectOptions() {
  return useQuery({
    queryKey: ['calendar', 'project-options'],
    queryFn: fetchProjectOptions,
    staleTime: 0,
  });
}

export function useProjectDetails(id: string) {
  return useQuery({
    queryKey: ['calendar', 'project-details', id],
    queryFn: () => fetchProjectDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
