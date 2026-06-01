import { mockReport } from '@/components/mock/reports/mock';
import {
  ReportAPIResponse,
  ReportData,
  ReportFilter,
} from '@/components/types/reports/types';
import { api } from '../api/request';

const CLIENT_COLORS = [
  '#2E86DE',
  '#E07ABF',
  '#F39C12',
  '#4CAF50',
  '#7C3AED',
  '#E84545',
  '#00BCD4',
  '#FF5722',
];

function toChartData(items: { clientName: string; total: number }[]) {
  return items.map((item, i) => ({
    name: item.clientName,
    value: item.total,
    color: CLIENT_COLORS[i % CLIENT_COLORS.length],
  }));
}

function getDateRange(date: Date, filter?: Partial<ReportFilter>) {
  // filtro explícito tem prioridade
  if (filter?.dateFrom && filter?.dateTo) {
    return { start: filter.dateFrom, end: filter.dateTo };
  }

  // padrão: primeiro e último dia do mês atual
  const year = date.getFullYear();
  const month = date.getMonth();
  const start = new Date(year, month, 1).toISOString().split('T')[0];
  const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
  return { start, end };
}

export async function fetchReports(
  date: Date,
  filter?: Partial<ReportFilter>,
): Promise<ReportData> {
  const { start, end } = getDateRange(date, filter);

  const data = await api<ReportAPIResponse>(
    `/reports?start=${start}&end=${end}`,
  );

  return {
    totalMonth: data.totalMonth,
    totalEmitted: data.totalPaid,
    totalNotEmitted: data.totalPending,
    emitted: toChartData(data.paid),
    notEmitted: toChartData(data.pending),
  };
}
