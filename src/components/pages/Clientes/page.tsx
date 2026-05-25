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

interface Client {
  id: string;
  name: string;
  cnpj: string;
  projectCount: number;
  description?: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Ágatha Jamille',
    cnpj: '586.653.474-12',
    projectCount: 4,
    description:
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: '2',
    name: 'Carla Franco',
    cnpj: '586.653.474-12',
    projectCount: 5,
    description:
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: '3',
    name: 'Guilherme Mendes',
    cnpj: '586.653.474-12',
    projectCount: 5,
    description:
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: '4',
    name: 'João Gabriel',
    cnpj: '586.653.474-12',
    projectCount: 5,
    description:
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: '5',
    name: 'Matheus Ximenes',
    cnpj: '586.653.474-12',
    projectCount: 5,
    description:
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
];

export default function Clientes() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleAddClient(data: ClientFormData) {
    setClients(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: data.name,
        cnpj: data.cnpj,
        projectCount: 0,
        description: data.description || undefined,
      },
    ]);
    setIsModalOpen(false);
  }

  function handleDelete(id: string) {
    setClients(prev => prev.filter(c => c.id !== id));
  }

  function handleView(id: string) {
    console.log('Ver cliente', id);
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
        <Grid>
          {filtered.map(client => (
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
      </ScrollArea>

      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClient}
      />
    </Wrapper>
  );
}
