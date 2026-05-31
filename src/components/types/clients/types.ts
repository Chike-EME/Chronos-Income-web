export type Client = {
  id: string;
  name: string;
  cnpj: string;
  projectCount: number;
  description?: string;
};

export type ProjectSummary = {
  id: string;
  name: string;
  description?: string;
  client: string;
  totalHours: string;
  color: string;
};

export type ClientDetails = {
  id: string;
  name: string;
  cnpj: string;
  description?: string;
  projectCount: number;
  projects: ProjectSummary[];
};

export interface ClientAPI {
  id: number;
  name: string;
  fiscalId: string;
  description: string;
  projectCount: number;
  createdAt: string;
  updatedAt: string;
}

/* ---------------- Create Client ---------------- */

export interface CreateClientPayload {
  name: string;
  fiscalId: string;
  description: string;
}

export interface CreateClientResponse {
  id: number;
  name: string;
  fiscalId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
}

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

export interface CreateProjectPayload {
  name: string;
  color: string;
  hourlyRate: number;
  description: string;
  startDate: string;
  clientId: string;
}

export interface CreateProjectResponse {
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
}
