import { api } from '@/components/services/api/request';
import {
  CreateInvoicePayload,
  CreateInvoiceResponse,
  FetchInvoicesResponse,
  Invoice,
  InvoiceStatus,
} from '@/components/types/invoices/types';

export async function fetchInvoices(): Promise<FetchInvoicesResponse> {
  const invoices = await api<Invoice[]>('/invoices');
  return { invoices };
}

export async function deleteInvoice(id: string): Promise<void> {
  await api(`/invoices/${id}`, { method: 'DELETE' });
}

export async function downloadInvoice(id: string): Promise<void> {
  // TODO: implementar quando a rota de download estiver disponível
  console.log('[invoices] downloadInvoice →', id);
}

export async function createInvoice(
  payload: CreateInvoicePayload,
): Promise<CreateInvoiceResponse> {
  return api<CreateInvoiceResponse>('/invoices', {
    method: 'POST',
    body: payload,
  });
}

export async function updateInvoiceStatus(
  id: string,
  status: InvoiceStatus,
): Promise<void> {
  await api(`/invoices/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}
