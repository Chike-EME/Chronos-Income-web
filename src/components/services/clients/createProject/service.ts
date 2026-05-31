import {
  AddClientProjectPayload,
  AddClientProjectResponse,
} from '@/components/types/clients/project';

export async function addClientProject(
  payload: AddClientProjectPayload,
): Promise<AddClientProjectResponse> {
  await new Promise(res => setTimeout(res, 600)); // simula latência

  console.log('[mock] addClientProject →', payload);

  return {
    id: crypto.randomUUID(),
    ...payload,
  };
}
