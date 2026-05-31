import { Invoice } from '@/components/types/invoices/types';
import {
  Card,
  CardTitle,
  CardProject,
  CardDate,
  CardActions,
  ActionButton,
} from './styles';

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
  const formatted = invoice.value.toLocaleString('pt-BR', {
    minimumFractionDigits: 3,
  });

  return (
    <Card>
      <CardTitle>
        {invoice.clientName} – ${formatted}
      </CardTitle>
      <CardProject>{invoice.projectName}</CardProject>
      <CardDate>{invoice.date}</CardDate>

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
          <img
            src="/img/TrashIcon.svg"
            alt="excluir"
            width={20}
            height={20}
          />
        </ActionButton>
      </CardActions>
    </Card>
  );
}
