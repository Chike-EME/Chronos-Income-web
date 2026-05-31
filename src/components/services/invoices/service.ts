import { mockInvoices } from '@/components/mock/invoice/mock';
import { FetchInvoicesResponse } from '@/components/types/invoices/types';

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
