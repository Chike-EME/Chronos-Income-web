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
