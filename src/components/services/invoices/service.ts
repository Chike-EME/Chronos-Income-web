import { mockInvoices } from '@/components/mock/invoice/mock';
import {
  FetchInvoicesResponse,
  GenerateInvoicePayload,
} from '@/components/types/invoices/types';

export async function fetchInvoices(): Promise<FetchInvoicesResponse> {
  await new Promise(res => setTimeout(res, 600));
  return { invoices: mockInvoices };
}

export async function deleteInvoice(id: string): Promise<void> {
  await new Promise(res => setTimeout(res, 400));
  console.log('[mock] deleteInvoice →', id);
}

export async function downloadInvoice(id: string): Promise<void> {
  await new Promise(res => setTimeout(res, 400));
  console.log('[mock] downloadInvoice →', id);
}

export async function generateInvoice(
  payload: GenerateInvoicePayload,
): Promise<void> {
  await new Promise(res => setTimeout(res, 800));
  console.log('[mock] generateInvoice →', payload);

  // quando integrar: receber blob e fazer download
  // const blob = await api<Blob>('/invoices/generate', { method: 'POST', body: payload });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement('a');
  // a.href = url;
  // a.download = `invoice-${payload.dateFrom}-${payload.dateTo}.pdf`;
  // a.click();
  // URL.revokeObjectURL(url);
}
