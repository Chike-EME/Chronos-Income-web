import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteClient, fetchClients } from './service';
import { Client } from '@/components/types/clients/types';

const QUERY_KEY = ['clients'];

export function useClients(
  search: string,
  callbacks?: {
    onDeleteSuccess?: (id: string) => void;
    onDeleteError?: (error: Error) => void;
  },
) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchClients,
  });

  const filtered = (query.data ?? []).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const remove = useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Client[]>(QUERY_KEY, prev =>
        (prev ?? []).filter(c => c.id !== deletedId),
      );
      callbacks?.onDeleteSuccess?.(deletedId);
    },
    onError: (error: Error, id) => {
      callbacks?.onDeleteError?.(error);
    },
  });

  return {
    clients: filtered,
    isLoading: query.isLoading,
    isError: query.isError,
    deleteClient: remove,
  };
}
