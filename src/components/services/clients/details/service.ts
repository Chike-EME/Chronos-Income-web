import { ClientDetails } from '@/components/types/clients/details';

export async function fetchClientDetails(
  id: string,
): Promise<ClientDetails> {
  await new Promise(res => setTimeout(res, 700));
  return {
    id,
    name: 'Ágatha Jamille Torres Vieira',
    cnpj: '586.653.474-12',
    description:
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    projectCount: 4,
    projects: [
      {
        id: '1',
        name: 'Projeto 1',
        description: 'Lorem ipsum lorem ipsum',
        client: 'Ágatha Jamille',
        totalHours: '05:30:01',
        color: '#4A90D9',
      },
      {
        id: '2',
        name: 'Projeto 2',
        description: 'Lorem ipsum lorem ipsum',
        client: 'Ágatha Jamille',
        totalHours: '05:30:01',
        color: '#C94FC9',
      },
      {
        id: '3',
        name: 'Projeto 3',
        description: 'Lorem ipsum lorem ipsum',
        client: 'Ágatha Jamille',
        totalHours: '05:30:01',
        color: '#E8900A',
      },
      {
        id: '4',
        name: 'Projeto 4',
        description: 'Lorem ipsum lorem ipsum',
        client: 'Ágatha Jamille',
        totalHours: '05:30:01',
        color: '#E84545',
      },
    ],
  };
}
