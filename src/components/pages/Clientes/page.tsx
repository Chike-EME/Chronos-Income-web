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
import { CreateProjectModal } from '@/components/Modals/CreateProject';
import { Modal } from '@/components/Modals';

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'deleteClient'; id: string }
  | { type: 'error' };

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>({ type: 'none' });
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
    setModal({ type: 'success' });
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
                      onClick={() =>
                        setModal({
                          type: 'deleteClient',
                          id: client.id,
                        })
                      }
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
        onAddProject={() => setCreateProjectOpen(true)}
      />

      <CreateProjectModal
        isOpen={createProjectOpen}
        clientId={detailsModal.client?.id ?? ''}
        onClose={() => setCreateProjectOpen(false)}
        onSuccess={() => {
          setCreateProjectOpen(false);
        }}
      />

      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => {
          setModal({ type: 'none' });
        }}
        onConfirm={() => {
          if (modal.type === 'deleteClient') {
            handleDelete(modal.id);
          } else {
            setModal({ type: 'none' });
          }
        }}
        customTitle={
          modal.type == 'deleteClient'
            ? 'Excluir cliente?'
            : 'Sucesso!'
        }
        message={
          modal.type === 'deleteClient'
            ? 'Você está prestes a excluir um cliente.\n Tem certeza que deseja continuar?'
            : 'Cliente excluido com sucesso.'
        }
        customClose={
          modal.type === 'deleteClient' ? 'Cancelar' : 'none'
        }
        customConfirm={
          modal.type === 'deleteClient' ? 'Excluir' : 'Fechar'
        }
      />
    </Wrapper>
  );
}
