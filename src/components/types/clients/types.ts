export type Client = {
  id: string;
  name: string;
  cnpj: string;
  projectCount: number;
  description?: string;
};

export type Project = {
  id: number;
  name: string;
  color: string;
  hourlyRate: number;
  description: string;
  startDate: string;
  status: string; //ACTIVE OR INACTIVE OR COMPLETED
  clientId: string;
  client: string;
  totalHours: string;
};

export type ProjectSummary = Project;

export type ClientDetails = {
  id: string;
  name: string;
  cnpj: string;
  description?: string;
  projectCount: number;
  projects: ProjectSummary[];
};

export type ClientAPI = {
  id: number;
  name: string;
  fiscalId: string;
  description: string;
  projectCount: number;
  createdAt: string;
  updatedAt: string;
};

/* ---------------- Create Client ---------------- */

export type CreateClientPayload = {
  name: string;
  fiscalId: string;
  description: string;
};

export type CreateClientResponse = {
  id: number;
  name: string;
  fiscalId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiError = {
  timestamp: string;
  status: number;
  error: string;
};

/* ---------------- Projects ---------------- */

export type ProjectAPI = {
  id: number;
  name: string;
  color: string;
  hourlyRate: number;
  totalHours: number;
  description: string;
  startDate: string;
  status: string;
  clientId: number;
  clientName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectPayload = {
  name: string;
  color: string;
  hourlyRate: number;
  description: string;
  startDate: string;
  clientId: string;
};

export type CreateProjectResponse = {
  id: number;
  name: string;
  color: string;
  hourlyRate: number;
  description: string;
  startDate: string;
  status: string;
  clientId: number;
  clientName: string;
  createdAt: string;
  updatedAt: string;
};

export type EditProjectPayload = {
  name: string;
  color: string;
  hourlyRate: number;
  description: string;
  startDate: string;
  clientId: string;
};

export type ProjectStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
