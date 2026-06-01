export type CalendarDay = {
  day: string;
  weekDay: string;
  fullDate: string;
};

export type ProjectCard = {
  id: string;
  projectName: string;
  color: string;
  description: string;
  clientName: string;
  clientId: string;
  date: string;
  totalSeconds: number;
  isRunning: boolean;
  status: string;
  hourlyRate: number;
};

export type StartTimerResponse = {
  sessionId: string;
  startedAt: string;
};

export type StopTimerResponse = {
  sessionId: string;
  stoppedAt: string;
  elapsedSeconds: number;
};

export type UpdateProjectCardPayload = {
  date: string;
  totalSeconds: number;
};

/* ---------------- Add Timer ---------------- */

export type ProjectSelectOption = {
  id: string;
  name: string;
};

export type ProjectDetails = {
  name: string;
  client: string;
  color: string;
  colorLabel?: string;
  description?: string;
  hourlyRate?: string;
};

export type ProjectFormData = {
  projectId: string;
  client: string;
  projectName: string;
  color: string;
  description: string;
  hourlyRate: string;
  date: string;
};

export type AddProjectPayload = {
  projectId: string;
  date: string;
};

export type AddProjectResponse = {
  success: boolean;
  message: string;
  projectId?: string;
  date?: string;
};

export interface UpdateProjectCardResponse {
  id: string;
  date: string;
  totalSeconds: number;
}

export interface TimeEntryAPI {
  id: number;
  entryDate: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: string;
  timerStatus: 'RUNNING' | 'STOPPED' | 'PAUSED';
  description: string;
  invoiced: boolean;
  projectId: number;
  projectName: string;
  projectColor: string;
  clientId: number;
  clientName: string;
  createdAt: string;
  updatedAt: string;
}
