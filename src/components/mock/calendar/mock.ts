import {
  ProjectDetails,
  ProjectSelectOption,
} from '@/components/types/calendar/addProject';
import { ProjectCard } from '@/components/types/calendar/calendar';

export const mockProjectOptions: ProjectSelectOption[] = [
  { id: '1', name: 'Site Institucional' },
  { id: '2', name: 'App Mobile' },
  { id: '3', name: 'Dashboard Analytics' },
  { id: '4', name: 'E-commerce' },
];

export const mockProjectDetails: Record<string, ProjectDetails> = {
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
    description: 'Painel de métricas e relatórios em tempo real.',
    hourlyRate: '175,00',
  },
  '4': {
    name: 'E-commerce',
    client: 'Loja Delta',
    color: '#C94FC9',
    colorLabel: 'Rosa',
    hourlyRate: '160,00',
  },
};

export const mockProjectCards: Record<string, ProjectCard[]> = {
  [new Date().toISOString().split('T')[0]]: [
    {
      id: '1',
      projectName: 'Projeto 1',
      color: '#4CAF50',
      description: 'Lorem ipsum lorem ipsum',
      clientName: 'Ágatha Jamille',
      clientId: '1',
      date: new Date().toISOString().split('T')[0],
      totalSeconds: 0,
      isRunning: false,
      status: 'ACTIVE',
      hourlyRate: 150,
    },
    {
      id: '2',
      projectName: 'Projeto 2',
      color: '#2196F3',
      description: 'Lorem ipsum lorem ipsum',
      clientName: 'Carla Franco',
      clientId: '2',
      date: new Date().toISOString().split('T')[0],
      totalSeconds: 3661,
      isRunning: false,
      status: 'ACTIVE',
      hourlyRate: 200,
    },
  ],
};
