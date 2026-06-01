export type TimeEntry = {
  id: number;
  entryDate: string;
  startTime: string;
  endTime: string;
  duration: string;
  description: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  periodStart: string;
  periodEnd: string;
  totalDuration: string;
  hourlyRate: number;
  totalAmount: number;
  status: string;
  clientId: number;
  clientName: string;
  clientFiscalId: string;
  projectId: number;
  projectName: string;
  timeEntries: TimeEntry[];
  createdAt: string;
  updatedAt: string;
};

export type FetchInvoicesResponse = {
  invoices: Invoice[];
};

export type GenerateInvoicePayload = {
  dateFrom: string;
  dateTo: string;
  clientId: string;
  projectId: string;
};
