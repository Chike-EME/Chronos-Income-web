import { ProjectDetails } from '@/components/types/calendar/addProject';

const mockDatabase: Record<string, ProjectDetails> = {
  '1': {
    name: 'Site Institucional',
    client: 'Empresa Alpha',
    color: '#4CAF50',
    colorLabel: 'Verde',
    description: 'Redesign completo do site institucional.',
    hourlyRate: '150,00',
  },
  '2': {
    name: 'App Mobile',
    client: 'Startup Beta',
    color: '#2196F3',
    colorLabel: 'Azul',
    description: 'Desenvolvimento do aplicativo iOS e Android.',
    hourlyRate: '200,00',
  },
  '3': {
    name: 'Dashboard Analytics',
    client: 'Empresa Gamma',
    color: '#FF5722',
    colorLabel: 'Laranja',
    hourlyRate: '175,00',
  },
};

export async function fetchProjectDetails(
  id: string,
): Promise<ProjectDetails> {
  await new Promise(res => setTimeout(res, 600));

  const project = mockDatabase[id];
  if (!project) throw new Error(`Projeto ${id} não encontrado`);

  return project;
}
