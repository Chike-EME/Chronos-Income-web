import { api } from '@/components/services/api/request';
import {
  FetchInvoicesResponse,
  GenerateInvoicePayload,
  Invoice,
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

export async function generateInvoice(
  payload: GenerateInvoicePayload,
): Promise<void> {
  await api('/invoices', { method: 'POST', body: payload });
}
