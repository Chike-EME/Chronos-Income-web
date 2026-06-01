import { Invoice } from '@/components/types/invoices/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBadge,
  CardProject,
  CardMeta,
  CardMetaItem,
  CardActions,
  ActionButton,
} from './styles';

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: '#E8900A' },
  PAID: { label: 'Pago', color: '#4CAF50' },
  CANCELLED: { label: 'Cancelado', color: '#E84545' },
};

interface InvoiceCardProps {
  invoice: Invoice;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  downloading?: boolean;
}

export function InvoiceCard({
  invoice,
  onDownload,
  onDelete,
  downloading,
}: InvoiceCardProps) {
  const totalFormatted = invoice.totalAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const period = `${formatDate(invoice.periodStart)} – ${formatDate(
    invoice.periodEnd,
  )}`;
  const status = STATUS_CONFIG[invoice.status] ?? {
    label: invoice.status,
    color: '#aaa',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{invoice.invoiceNumber}</CardTitle>
        <CardBadge $color={status.color}>{status.label}</CardBadge>
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
          disabled={downloading}
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
