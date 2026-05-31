import {
  Client,
  ClientAPI,
  ClientDetails,
  CreateClientPayload,
  CreateClientResponse,
  CreateProjectPayload,
  CreateProjectResponse,
  ProjectAPI,
  ProjectSummary,
} from '@/components/types/clients/types';
import { api } from '../api/request';
import { formatHours } from '@/utils/formatHours';

/* ---------------- List Client ---------------- */

function toClient(c: ClientAPI): Client {
  return {
    id: String(c.id),
    name: c.name,
    cnpj: c.fiscalId,
    description: c.description,
    projectCount: c.projectCount,
  };
}

export async function fetchClients(): Promise<Client[]> {
  const data = await api<ClientAPI[]>('/clients');
  return data.map(toClient);
}

export async function deleteClient(id: string): Promise<void> {
  await api(`/clients/${id}`, { method: 'DELETE' });
}

/* ---------------- Client Details ---------------- */

function toProjectSummary(p: ProjectAPI): ProjectSummary {
  return {
    id: String(p.id),
    name: p.name,
    description: p.description,
    client: p.clientName,
    color: p.color,
    totalHours: formatHours(p.totalHours),
  };
}

export async function fetchClientDetails(
  clientId: string,
  client: { name: string; cnpj: string; description?: string },
): Promise<ClientDetails> {
  const projects = await api<ProjectAPI[]>(`/projects/client/${clientId}`);

  const summaries = projects.map(toProjectSummary);

  return {
    id: clientId,
    name: client.name,
    cnpj: client.cnpj,
    description: client.description,
    projectCount: summaries.length,
    projects: summaries,
  };
}

/* ---------------- Create Client ---------------- */

export async function createClient(
  payload: CreateClientPayload,
): Promise<CreateClientResponse> {
  return api<CreateClientResponse>('/clients', {
    method: 'POST',
    body: payload,
  });
}

/* ---------------- Create Project ---------------- */

export async function createProject(
  payload: CreateProjectPayload,
): Promise<CreateProjectResponse> {
  return api<CreateProjectResponse>('/projects', {
    method: 'POST',
    body: payload,
  });
}
