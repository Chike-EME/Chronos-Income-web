export interface ProjectSelectOption {
  id: string;
  name: string;
}

export interface ProjectDetails {
  name: string;
  client: string;
  color: string;
  colorLabel?: string;
  description?: string;
  hourlyRate?: string;
}

export interface ProjectFormData {
  projectId: string;
  client: string;
  projectName: string;
  color: string;
  description: string;
  hourlyRate: string;
  date: string;
}
