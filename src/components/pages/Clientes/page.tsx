'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { AddClientModal } from '@/components/Modals/AddClient';
import { ClientFormData } from '@/components/Modals/AddClient';
import {
  Wrapper,
  ScrollArea,
  Grid,
  ClientCard,
  CardHeader,
  ClientName,
  CardActions,
  ActionButton,
  CardMeta,
  MetaItem,
  Description,
} from './styles';
import { fetchClientDetails } from '@/components/services/clients/details/service';
import { ClientDetailsModal } from '@/components/Modals/ClientDetails';
import { ClientDetails } from '@/components/types/clients/details';
import { useClients } from '@/components/services/clients';
import { ClientsSkeleton } from '@/components/skeletons/clients';

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{
    open: boolean;
    client: ClientDetails | null;
    loading: boolean;
  }>({ open: false, client: null, loading: false });

  const { clients, isLoading, addClient, deleteClient } =
    useClients(search);

  function handleAddClient(data: ClientFormData) {
    addClient.mutate(
      {
        name: data.name,
        cnpj: data.cnpj,
        projectCount: 0,
        description: data.description || undefined,
      },
      { onSuccess: () => setIsModalOpen(false) },
    );
  }

  function handleDelete(id: string) {
    deleteClient.mutate(id);
  }

  async function handleView(id: string) {
    setDetailsModal({ open: true, client: null, loading: true });
    const data = await fetchClientDetails(id);
    setDetailsModal({ open: true, client: data, loading: false });
  }

  return (
    <Wrapper>
      <Header
        type="Clientes"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={() => {}}
        onAddClick={() => setIsModalOpen(true)}
      />

      <ScrollArea>
        {isLoading ? (
          <ClientsSkeleton />
        ) : (
          <Grid>
            {clients.map(client => (
              <ClientCard key={client.id}>
                <CardHeader>
                  <ClientName>{client.name}</ClientName>
                  <CardActions>
                    <ActionButton
                      onClick={() => handleView(client.id)}
                      aria-label="Ver"
                    >
                      <img
                        src="/img/ViewIcon.svg"
                        alt="ver"
                        width={20}
                        height={20}
                      />
                    </ActionButton>
                    <ActionButton
                      $danger
                      onClick={() => handleDelete(client.id)}
                      aria-label="Excluir"
                    >
                      <img
                        src="/img/TrashIcon.svg"
                        alt="excluir"
                        width={20}
                        height={20}
                      />
                    </ActionButton>
                  </CardActions>
                </CardHeader>

                <CardMeta>
                  <MetaItem>CNPJ: {client.cnpj}</MetaItem>
                  <MetaItem>{client.projectCount} Projetos</MetaItem>
                </CardMeta>

                {client.description && (
                  <Description>
                    Descrição: {client.description}
                  </Description>
                )}
              </ClientCard>
            ))}
          </Grid>
        )}
      </ScrollArea>

      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClient}
      />

      <ClientDetailsModal
        isOpen={detailsModal.open}
        onClose={() =>
          setDetailsModal({
            open: false,
            client: null,
            loading: false,
          })
        }
        client={detailsModal.client}
        loading={detailsModal.loading}
        onAddProject={() =>
          console.log('adicionar projeto ao cliente')
        }
      />
    </Wrapper>
  );
}
