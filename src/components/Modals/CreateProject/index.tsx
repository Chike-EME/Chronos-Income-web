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
  SelectWrapper,
  Select,
  ChevronIcon,
  SubmitButton,
} from './styles';
import { Modal as ConfirmModal } from '@/components/Modals';
import { useCreateProject } from '@/components/services/clients/useCreateProject';
import { ErrorText } from '@/styles/global';

const colorOptions = [
  { label: 'Azul', value: '#4A90D9' },
  { label: 'Rosa', value: '#C94FC9' },
  { label: 'Laranja', value: '#E8900A' },
  { label: 'Vermelho', value: '#E84545' },
  { label: 'Verde', value: '#4CAF50' },
  { label: 'Roxo', value: '#7C3AED' },
];

interface CreateProjectModalProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

type ModalType = { type: 'none' } | { type: 'success' } | { type: 'error' };

export function CreateProjectModal({
  isOpen,
  clientId,
  onClose,
  onSuccess,
}: CreateProjectModalProps) {
  const [form, setForm] = useState({
    name: '',
    color: '',
    hourlyRate: '',
    description: '',
    startDate: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [modal, setModal] = useState<ModalType>({ type: 'none' });

  const { mutate: submitProject, isPending } = useCreateProject({
    onSuccess: () => {
      setModal({ type: 'success' });
    },
    onError: message => {
      setErrorMessage(message);
    },
  });

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  }

  function handleSubmit() {
    if (!clientId) return;
    submitProject({
      name: form.name,
      color: form.color,
      hourlyRate: Number(form.hourlyRate),
      description: form.description,
      startDate: form.startDate,
      clientId,
    });
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const isValid =
    form.name.trim() !== '' &&
    form.color !== '' &&
    form.startDate.trim() !== '';

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Adicionar projeto</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        <ScrollArea>
          <Field>
            <Label>Nome do Projeto</Label>
            <Input
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Insira o nome do projeto"
            />
          </Field>

          <Field>
            <Label>Cor</Label>
            <SelectWrapper>
              <Select
                value={form.color}
                onChange={e => handleChange('color', e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              <ChevronIcon>
                <img src="/img/ChevronDown.svg" alt="" width={16} height={16} />
              </ChevronIcon>
            </SelectWrapper>
          </Field>

          <Field>
            <Label>Descrição (opcional)</Label>
            <Input
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Insira uma descrição"
            />
          </Field>

          <Field>
            <Label>Valor hora (opcional)</Label>
            <Input
              value={form.hourlyRate}
              onChange={e => handleChange('hourlyRate', e.target.value)}
              placeholder="Insira o valor hora"
              type="number"
              min={0}
            />
          </Field>

          <Field>
            <Label>Data de início</Label>
            <Input
              type="date"
              value={form.startDate}
              onChange={e => handleChange('startDate', e.target.value)}
            />
          </Field>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </ScrollArea>

        <SubmitButton onClick={handleSubmit} disabled={!isValid || isPending}>
          {isPending ? 'Salvando...' : 'Concluir'}
        </SubmitButton>
      </Modal>

      <ConfirmModal
        isOpen={modal.type !== 'none'}
        variant="success"
        onClose={() => {
          setModal({ type: 'none' });
          onClose();
          onSuccess?.();
        }}
        onConfirm={() => {
          setModal({ type: 'none' });
          onClose();
          onSuccess?.();
        }}
        customTitle="Projeto criado!"
        message="Projeto criado com sucesso."
        customClose="none"
        customConfirm="Fechar"
      />
    </Overlay>
  );
}
