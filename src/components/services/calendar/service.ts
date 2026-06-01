import {
  AddProjectPayload,
  AddProjectResponse,
  CreateTimerPayload,
  ProjectByIdAPI,
  ProjectDetails,
  ProjectSelectOption,
  ProjectSummaryAPI,
  TimeEntryAPI,
  UpdateProjectCardResponse,
  ProjectCard,
  StartTimerResponse,
  StopTimerResponse,
  UpdateProjectCardPayload,
} from '@/components/types/calendar/type';
import { api } from '../api/request';

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

export async function addProject(
  payload: AddProjectPayload & { description?: string },
): Promise<AddProjectResponse> {
  try {
    await api<TimeEntryAPI>('/time-entries/timer/start', {
      method: 'POST',
      body: {
        projectId: Number(payload.projectId),
        entryDate: payload.date,
        description: payload.description ?? '',
        startPaused: true,
      } satisfies CreateTimerPayload,
    });

    return {
      success: true,
      message: 'Projeto adicionado com sucesso!',
      projectId: payload.projectId,
      date: payload.date,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Erro ao adicionar projeto. Tente novamente.';
    return { success: false, message };
  }
}

export async function fetchProjectCardsByDate(
  date: string,
): Promise<ProjectCard[]> {
  const entries = await api<TimeEntryAPI[]>('/time-entries');

  return entries
    .filter(e => e.entryDate === date)
    .map(e => ({
      id: String(e.id),
      projectName: e.projectName,
      color: e.projectColor,
      description: e.description,
      clientName: e.clientName,
      clientId: String(e.clientId),
      date: e.entryDate,
      totalSeconds: durationToSeconds(e.duration),
      isRunning: e.timerStatus === 'RUNNING',
      status: e.timerStatus,
      hourlyRate: 0,
    }));
}

export async function updateProjectCard(
  id: string,
  payload: UpdateProjectCardPayload,
): Promise<UpdateProjectCardResponse> {
  await new Promise(res => setTimeout(res, 400));
  console.log('[mock] updateProjectCard →', { id, payload });
  return { id, ...payload };
}

export async function pauseTimer(cardId: string): Promise<TimeEntryAPI> {
  return api<TimeEntryAPI>(`/time-entries/timer/${cardId}/pause`, {
    method: 'PATCH',
  });
}

export async function resumeTimer(cardId: string): Promise<TimeEntryAPI> {
  return api<TimeEntryAPI>(`/time-entries/timer/${cardId}/resume`, {
    method: 'PATCH',
  });
}

export async function startTimer(cardId: string): Promise<StartTimerResponse> {
  const entry = await resumeTimer(cardId);
  return { sessionId: String(entry.id), startedAt: entry.updatedAt };
}

export async function stopTimer(
  cardId: string,
  _sessionId: string,
): Promise<StopTimerResponse> {
  const entry = await pauseTimer(cardId);
  return {
    sessionId: String(entry.id),
    stoppedAt: entry.updatedAt,
    elapsedSeconds: durationToSeconds(entry.duration),
  };
}

export async function stopTimerEntry(cardId: string): Promise<TimeEntryAPI> {
  return api<TimeEntryAPI>(`/time-entries/timer/${cardId}/stop`, {
    method: 'PATCH',
  });
}

export async function deleteProjectCard(id: string): Promise<void> {
  await api(`/time-entries/${id}`, { method: 'DELETE' });
}

function durationToSeconds(duration: string): number {
  const [h = '0', m = '0', s = '0'] = duration.split(':');
  return Number(h) * 3600 + Number(m) * 60 + Math.floor(Number(s));
}
