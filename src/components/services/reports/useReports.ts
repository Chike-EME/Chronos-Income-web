import { useQuery } from '@tanstack/react-query';
import { fetchReports } from './service';
import { ReportFilter } from '@/components/types/reports/types';

export function useReports(date: Date, filter?: Partial<ReportFilter>) {
  return useQuery({
    queryKey: ['reports', date.getFullYear(), date.getMonth(), filter],
    queryFn: () => fetchReports(date, filter),
    staleTime: 1000 * 60 * 5,
  });
}
