import { api } from '../../api/request';
import { ProjectCard, TimeEntryAPI } from '@/components/types/calendar/type';

function durationToSeconds(duration: string): number {
  const [h = '0', m = '0', s = '0'] = duration.split(':');
  return Number(h) * 3600 + Number(m) * 60 + Math.floor(Number(s));
}

function toProjectCard(entry: TimeEntryAPI): ProjectCard {
  return {
    id: String(entry.id),
    projectName: entry.projectName,
    color: entry.projectColor,
    description: entry.description,
    clientName: entry.clientName,
    clientId: String(entry.clientId),
    date: entry.entryDate,
    totalSeconds: durationToSeconds(entry.duration),
    isRunning: entry.timerStatus === 'RUNNING',
    status: entry.timerStatus,
    hourlyRate: 0,
  };
}

export async function fetchTimeEntries(): Promise<TimeEntryAPI[]> {
  return api<TimeEntryAPI[]>('/time-entries');
}

export async function fetchAllTimeEntries(): Promise<
  Record<string, ProjectCard[]>
> {
  const entries = await api<TimeEntryAPI[]>('/time-entries');

  return entries.reduce<Record<string, ProjectCard[]>>((acc, entry) => {
    const card = toProjectCard(entry);
    if (!acc[entry.entryDate]) acc[entry.entryDate] = [];
    acc[entry.entryDate].push(card);
    return acc;
  }, {});
}

export async function deleteTimeEntry(id: string): Promise<void> {
  await api(`/time-entries/${id}`, { method: 'DELETE' });
}
