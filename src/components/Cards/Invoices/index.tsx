// components/Cards/Invoices/index.tsx — remover CardBadge, usar InvoiceStatusBadge
import { useState } from 'react';
import { Invoice, InvoiceStatus } from '@/components/types/invoices/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardProject,
  CardMeta,
  CardMetaItem,
  CardActions,
  ActionButton,
} from './styles';
import { updateInvoiceStatus } from '@/components/services/invoices/service';
import { InvoiceStatusBadge } from './statusBadge';

interface InvoiceCardProps {
  invoice: Invoice;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChanged?: (id: string, status: InvoiceStatus) => void;
  downloading?: boolean;
}

export function InvoiceCard({
  invoice,
  onDownload,
  onDelete,
  onStatusChanged,
  downloading,
}: InvoiceCardProps) {
  const [status, setStatus] = useState(invoice.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function handleStatusChange(newStatus: InvoiceStatus) {
    setUpdatingStatus(true);
    try {
      await updateInvoiceStatus(invoice.id, newStatus);
      setStatus(newStatus);
      onStatusChanged?.(invoice.id, newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  }

  const totalFormatted = invoice.totalAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const period = `${formatDate(invoice.periodStart)} – ${formatDate(
    invoice.periodEnd,
  )}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{invoice.invoiceNumber}</CardTitle>
        <InvoiceStatusBadge status={status} onChange={handleStatusChange} />
      </CardHeader>

      <CardProject>{invoice.projectName}</CardProject>
      <CardProject style={{ opacity: 0.7, fontSize: 13 }}>
        {invoice.clientName}
      </CardProject>

      <CardMeta>
        <CardMetaItem>Período: {period}</CardMetaItem>
        <CardMetaItem>Duração: {invoice.totalDuration}</CardMetaItem>
        <CardMetaItem>
          Valor hora:{' '}
          {invoice.hourlyRate.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </CardMetaItem>
        <CardMetaItem>
          <strong>{totalFormatted}</strong>
        </CardMetaItem>
      </CardMeta>

      <CardActions>
        <ActionButton
          onClick={() => onDownload(invoice.id)}
          aria-label="Baixar invoice"
          disabled={downloading || updatingStatus}
        >
          <img
            src="/img/DownloadIcon.svg"
            alt="baixar"
            width={20}
            height={20}
          />
        </ActionButton>
        <ActionButton
          $danger
          onClick={() => onDelete(invoice.id)}
          aria-label="Excluir invoice"
          disabled={updatingStatus}
        >
          <img src="/img/TrashIcon.svg" alt="excluir" width={20} height={20} />
        </ActionButton>
      </CardActions>
    </Card>
  );
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}
