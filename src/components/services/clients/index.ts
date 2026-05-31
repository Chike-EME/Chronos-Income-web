import { mockClients } from '@/components/mock/clients/mock';
import { Client } from '@/components/types/clients/details';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

/* ---------------- mock ---------------- */

export async function fetchClients(): Promise<Client[]> {
  await new Promise(res => setTimeout(res, 600));
  return mockClients;
}

const QUERY_KEY = ['clients'];

export function useClients(search: string) {
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchClients,
  });

  const filtered = (query.data ?? []).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const queryClient = useQueryClient();

  const addClient = useMutation({
    mutationFn: async (newClient: Omit<Client, 'id'>) => {
      await new Promise(res => setTimeout(res, 400));
      return { ...newClient, id: crypto.randomUUID() };
    },
    onSuccess: created => {
      queryClient.setQueryData<Client[]>(QUERY_KEY, prev => [
        ...(prev ?? []),
        created,
      ]);
    },
  });

  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(res => setTimeout(res, 300));
      return id;
    },
    onSuccess: deletedId => {
      queryClient.setQueryData<Client[]>(QUERY_KEY, prev =>
        (prev ?? []).filter(c => c.id !== deletedId),
      );
    },
  });

  return {
    clients: filtered,
    isLoading: query.isLoading,
    isError: query.isError,
    addClient,
    deleteClient,
  };
}
