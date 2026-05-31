import { useState } from 'react';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  ScrollArea,
  Field,
  Label,
  Input,
  SubmitButton,
} from './styles';
import { useCreateClient } from '@/components/services/clients/useCreateClient';
import { ErrorText } from '@/styles/global';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddClientModal({
  isOpen,
  onClose,
  onSuccess,
}: AddClientModalProps) {
  const [form, setForm] = useState({ name: '', cnpj: '', description: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: submitClient, isPending } = useCreateClient({
    onSuccess: () => {
      setForm({ name: '', cnpj: '', description: '' });
      setErrorMessage('');
      onSuccess?.();
      onClose();
    },
    onError: message => setErrorMessage(message),
  });

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  }

  function handleSubmit() {
    submitClient({
      name: form.name,
      fiscalId: form.cnpj,
      description: form.description,
    });
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const isValid = form.name.trim() !== '' && form.cnpj.trim() !== '';

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Adicionar cliente</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        <ScrollArea>
          <Field>
            <Label>Nome do Cliente</Label>
            <Input
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Insira o nome do cliente"
            />
          </Field>

          <Field>
            <Label>CNPJ/EIN</Label>
            <Input
              value={form.cnpj}
              onChange={e => handleChange('cnpj', e.target.value)}
              placeholder="Insira o CNPJ/EIN"
            />
          </Field>

          <Field>
            <Label>Descrição (opcional)</Label>
            <Input
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Insira uma descrição"
            />
          </Field>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </ScrollArea>

        <SubmitButton onClick={handleSubmit} disabled={!isValid || isPending}>
          {isPending ? 'Salvando...' : 'Concluir'}
        </SubmitButton>
      </Modal>
    </Overlay>
  );
}
