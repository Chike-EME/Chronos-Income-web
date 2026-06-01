'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { AddClientModal } from '@/components/Modals/AddClient';

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
import { useClients } from '@/components/services/clients/useClients';
import { ClientDetailsModal } from '@/components/Modals/ClientDetails';
import { ClientDetails } from '@/components/types/clients/types';
import { ClientsSkeleton } from '@/components/skeletons/clients';
import { CreateProjectModal } from '@/components/Modals/CreateProject';
import { Modal } from '@/components/Modals';
import { fetchClientDetails } from '@/components/services/clients/service';

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'deleteClient'; id: string }
  | { type: 'deleteError' }
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

  const { clients, isLoading, deleteClient } = useClients(search, {
    onDeleteSuccess: deletedId => {
      if (detailsModal.client?.id === deletedId) {
        setDetailsModal({ open: false, client: null, loading: false });
      }
      setModal({ type: 'success' });
    },
    onDeleteError: error => {
      const msg = error.message.toLowerCase();
      const hasProjects =
        msg.includes('projeto') ||
        msg.includes('project') ||
        msg.includes('vinculado') ||
        msg.includes('associated');

      setModal({ type: hasProjects ? 'deleteError' : 'error' });
    },
  });

  async function refreshClientDetails() {
    if (!detailsModal.client?.id) return;
    const data = await fetchClientDetails(detailsModal.client.id, {
      name: detailsModal.client.name,
      cnpj: detailsModal.client.cnpj,
      description: detailsModal.client.description,
    });
    setDetailsModal(prev => ({ ...prev, client: data }));
  }

  function handleDelete(id: string) {
    deleteClient.mutate(id);
  }

  async function handleView(id: string) {
    const clientOnList = clients.find(c => c.id === id);

    setDetailsModal({ open: true, client: null, loading: true });

    try {
      const data = await fetchClientDetails(id, {
        name: clientOnList?.name ?? '',
        cnpj: clientOnList?.cnpj ?? '',
        description: clientOnList?.description,
      });
      setDetailsModal({ open: true, client: data, loading: false });
    } catch {
      setDetailsModal({ open: false, client: null, loading: false });
      setModal({ type: 'error' });
    }
  }

  const modalTitle = () => {
    switch (modal.type) {
      case 'deleteClient':
        return 'Excluir cliente?';
      case 'deleteError':
        return 'Não é possível excluir';
      case 'success':
        return 'Sucesso!';
      default:
        return 'Erro';
    }
  };

  const modalMessage = () => {
    switch (modal.type) {
      case 'deleteClient':
        return 'Você está prestes a excluir um cliente.\nTem certeza que deseja continuar?';
      case 'deleteError':
        return 'Este cliente possui projetos vinculados. Remova os projetos antes de excluir o cliente.';
      case 'success':
        return 'Cliente excluído com sucesso.';
      default:
        return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  };

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
                  <Description>Descrição: {client.description}</Description>
                )}
              </ClientCard>
            ))}
          </Grid>
        )}
      </ScrollArea>

      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />

      <ClientDetailsModal
        isOpen={detailsModal.open}
        onClose={() =>
          setDetailsModal({ open: false, client: null, loading: false })
        }
        client={detailsModal.client}
        loading={detailsModal.loading}
        onAddProject={() => setCreateProjectOpen(true)}
        onProjectEdited={refreshClientDetails}
      />

      <CreateProjectModal
        isOpen={createProjectOpen}
        clientId={detailsModal.client?.id ?? ''}
        onClose={() => setCreateProjectOpen(false)}
        onSuccess={refreshClientDetails}
      />

      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => setModal({ type: 'none' })}
        onConfirm={() => {
          if (modal.type === 'deleteClient') {
            handleDelete((modal as { type: 'deleteClient'; id: string }).id);
          } else {
            setModal({ type: 'none' });
          }
        }}
        customTitle={modalTitle()}
        message={modalMessage()}
        customClose={modal.type === 'deleteClient' ? 'Cancelar' : 'none'}
        customConfirm={modal.type === 'deleteClient' ? 'Excluir' : 'Fechar'}
      />
    </Wrapper>
  );
}
