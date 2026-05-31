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

export interface UpdateProjectCardPayload {
  date: string;
  totalSeconds: number;
}

export interface UpdateProjectCardResponse {
  id: string;
  date: string;
  totalSeconds: number;
}
