import {
  mockProjectCards,
  mockProjectDetails,
  mockProjectOptions,
} from '@/components/mock/calendar/mock';
import {
  AddProjectPayload,
  AddProjectResponse,
  ProjectDetails,
  ProjectSelectOption,
  UpdateProjectCardResponse,
} from '@/components/types/calendar/addProject';
import {
  ProjectCard,
  StartTimerResponse,
  StopTimerResponse,
  UpdateProjectCardPayload,
} from '@/components/types/calendar/calendar';

export async function fetchProjectOptions(): Promise<ProjectSelectOption[]> {
  await new Promise(res => setTimeout(res, 500));
  return mockProjectOptions;
}

export async function fetchProjectDetails(id: string): Promise<ProjectDetails> {
  await new Promise(res => setTimeout(res, 600));
  const project = mockProjectDetails[id];
  if (!project) throw new Error(`Projeto ${id} não encontrado`);
  return project;
}

export async function addProject(
  payload: AddProjectPayload,
): Promise<AddProjectResponse> {
  await new Promise(res => setTimeout(res, 700));

  console.log('[mock] addProject →', payload);

  if (Math.random() < 0.02) {
    return {
      success: false,
      message: 'Erro ao adicionar projeto. Tente novamente.',
    };
  }

  return {
    success: true,
    message: 'Projeto adicionado com sucesso!',
    projectId: payload.projectId,
    date: payload.date,
  };
}

export async function fetchProjectCardsByDate(
  date: string,
): Promise<ProjectCard[]> {
  await new Promise(res => setTimeout(res, 500));
  return mockProjectCards[date] ?? [];
}

export async function startTimer(cardId: string): Promise<StartTimerResponse> {
  await new Promise(res => setTimeout(res, 300));
  console.log('[mock] startTimer →', cardId);
  return {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };
}

export async function stopTimer(
  cardId: string,
  sessionId: string,
): Promise<StopTimerResponse> {
  await new Promise(res => setTimeout(res, 300));
  console.log('[mock] stopTimer →', { cardId, sessionId });
  return {
    sessionId,
    stoppedAt: new Date().toISOString(),
    elapsedSeconds: 0, // back calcula o total real
  };
}

export async function updateProjectCard(
  id: string,
  payload: UpdateProjectCardPayload,
): Promise<UpdateProjectCardResponse> {
  await new Promise(res => setTimeout(res, 400));
  console.log('[mock] updateProjectCard →', { id, payload });
  return { id, ...payload };
}

export async function deleteProjectCard(cardId: string): Promise<void> {
  await new Promise(res => setTimeout(res, 400));
  console.log('[mock] deleteProjectCard →', cardId);
}
