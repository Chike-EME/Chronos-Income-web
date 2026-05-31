import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteInvoice,
  downloadInvoice,
  fetchInvoices,
} from './service';
import { Invoice } from '@/components/types/invoices/types';

const QUERY_KEY = ['invoices'];

export function useInvoices() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchInvoices,
    select: data => data.invoices,
  });

  const remove = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<{ invoices: Invoice[] }>(
        QUERY_KEY,
        prev => ({
          invoices: (prev?.invoices ?? []).filter(
            i => i.id !== deletedId,
          ),
        }),
      );
    },
  });

  const download = useMutation({
    mutationFn: downloadInvoice,
  });

  return {
    invoices: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    remove,
    download,
  };
}
