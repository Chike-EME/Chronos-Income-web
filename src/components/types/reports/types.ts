export type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};

export type ReportData = {
  totalMonth: number;
  totalEmitted: number;
  totalNotEmitted: number;
  emitted: ChartDataItem[];
  notEmitted: ChartDataItem[];
};

export type ReportFilter = {
  dateFrom: string;
  dateTo: string;
  clientName: string;
  projectId: string;
};

/* ---------------- tipos da API ---------------- */
export interface ReportClientItem {
  clientName: string;
  total: number;
}

export interface ReportAPIResponse {
  totalMonth: number;
  totalPaid: number;
  totalPending: number;
  paid: ReportClientItem[];
  pending: ReportClientItem[];
}
