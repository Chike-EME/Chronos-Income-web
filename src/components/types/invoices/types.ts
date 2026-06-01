export interface Invoice {
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoicePayload {
  projectId: number;
  hourlyRate: number;
  periodStart: string;
  periodEnd: string;
}

export interface InvoiceTimeEntry {
  id: number;
  entryDate: string;
  startTime: string;
  endTime: string;
  duration: string;
  description: string;
}

export interface CreateInvoiceResponse extends Invoice {
  timeEntries: {
    id: number;
    entryDate: string;
    startTime: string;
    endTime: string;
    duration: string;
    description: string;
  }[];
}

export type FetchInvoicesResponse = {
  invoices: Invoice[];
};

export type GenerateInvoicePayload = {
  dateFrom: string;
  dateTo: string;
  clientId: string;
  projectId: string;
};

export type InvoiceStatus = 'PENDING' | 'PAID' | 'CANCELLED';
