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
