'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Wrapper, ScrollArea, Grid } from './styles';
import { InvoicesSkeleton } from '@/components/skeletons/invoices';
import { useInvoices } from '@/components/services/invoices/useInvoice';
import { InvoiceCard } from '@/components/Cards/Invoices';
import { GenerateInvoiceModal } from '@/components/Modals/GenerateInvoice';

export default function Invoice() {
  const { invoices, isLoading, remove, download } = useInvoices();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      <Header
        type="Invoice"
        buttonText="Gerar Invoice"
        onAddClick={() => setIsModalOpen(true)}
      />

      <ScrollArea>
        {isLoading ? (
          <InvoicesSkeleton />
        ) : (
          <Grid>
            {invoices.map(invoice => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onDownload={id => download.mutate(id)}
                onDelete={id => remove.mutate(id)}
                downloading={
                  download.isPending && download.variables === invoice.id
                }
              />
            ))}
          </Grid>
        )}
      </ScrollArea>

      <GenerateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </Wrapper>
  );
}
