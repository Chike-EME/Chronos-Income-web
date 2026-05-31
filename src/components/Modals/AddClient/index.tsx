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

export interface ClientFormData {
  name: string;
  cnpj: string;
  description: string;
}

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => void;
}

export function AddClientModal({
  isOpen,
  onClose,
  onSubmit,
}: AddClientModalProps) {
  const [form, setForm] = useState<ClientFormData>({
    name: '',
    cnpj: '',
    description: '',
  });

  if (!isOpen) return null;

  function handleChange(field: keyof ClientFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    onSubmit(form);
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
        </ScrollArea>

        <SubmitButton onClick={handleSubmit} disabled={!isValid}>
          Concluir
        </SubmitButton>
      </Modal>
    </Overlay>
  );
}
