export type AddClientProjectPayload = {
  clientId: string;
  name: string;
  color: string;
  description: string;
  hourlyRate: string;
  date: string;
};

export type AddClientProjectResponse = {
  id: string;
  clientId: string;
  name: string;
  color: string;
  description: string;
  hourlyRate: string;
  date: string;
};
