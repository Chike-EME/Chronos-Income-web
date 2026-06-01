import { api } from '../../api/request';
import {
  CreateTimerPayload,
  ProjectByIdAPI,
  ProjectDetails,
  ProjectSelectOption,
  ProjectSummaryAPI,
  TimeEntryAPI,
} from '@/components/types/calendar/type';

export async function fetchProjectOptions(): Promise<ProjectSelectOption[]> {
  const data = await api<ProjectSummaryAPI[]>('/projects/active/summary');
  return data.map(p => ({ id: String(p.id), name: p.name }));
}

export async function fetchProjectDetails(id: string): Promise<ProjectDetails> {
  const data = await api<ProjectByIdAPI>(`/projects/${id}`);
  return {
    name: data.name,
    client: data.clientName,
    color: data.color,
    description: data.description,
    hourlyRate: String(data.hourlyRate),
  };
}

export async function createTimer(
  payload: CreateTimerPayload,
): Promise<TimeEntryAPI> {
  return api<TimeEntryAPI>('/time-entries/timer/start', {
    method: 'POST',
    body: payload,
  });
}
