export type Invoice = {
  id: string;
  clientName: string;
  projectName: string;
  value: number;
  date: string;
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
