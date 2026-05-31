import { mockReport } from '@/components/mock/reports/mock';
import {
  ReportData,
  ReportFilter,
} from '@/components/types/reports/types';
import { useQuery } from '@tanstack/react-query';

export async function fetchReports(
  _date: Date,
  _filter?: Partial<ReportFilter>,
): Promise<ReportData> {
  await new Promise(res => setTimeout(res, 700));
  console.log('[mock] fetchReports →', { _date, _filter });
  return mockReport;
}
