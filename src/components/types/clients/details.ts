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
