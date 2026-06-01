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
  ColorRow,
  ColorSwatch,
  SubmitButton,
  DeleteButton,
  ButtonRow,
} from './styles';
import { Modal as ConfirmModal } from '@/components/Modals';
import { useEditProject } from '@/components/services/clients/useEditProject';
import { useDeleteProject } from '@/components/services/clients/useDeleteProject';
import { ErrorText } from '@/styles/global';

const colorOptions = [
  { label: 'Azul', value: '#4A90D9' },
  { label: 'Rosa', value: '#C94FC9' },
  { label: 'Laranja', value: '#E8900A' },
  { label: 'Vermelho', value: '#E84545' },
  { label: 'Verde', value: '#4CAF50' },
  { label: 'Roxo', value: '#7C3AED' },
];

export interface ProjectToEdit {
  id: number;
  name: string;
  color: string;
  hourlyRate: number;
  description: string;
  startDate: string;
  clientId: string;
  status: string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  project: ProjectToEdit;
  onClose: () => void;
  onSuccess?: () => void;
  onDeleted?: () => void;
}

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'confirmDelete' }
  | { type: 'deleteSuccess' }
  | { type: 'error' };

export function EditProjectModal({
  isOpen,
  project,
  onClose,
  onSuccess,
  onDeleted,
}: EditProjectModalProps) {
  const isCompleted = project.status === 'completed';

  const [form, setForm] = useState({
    name: project.name,
    color: project.color,
    hourlyRate: String(project.hourlyRate),
    description: project.description,
    startDate: project.startDate,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [modal, setModal] = useState<ModalType>({ type: 'none' });

  const { mutate: submitEdit, isPending: isEditing } = useEditProject({
    onSuccess: () => setModal({ type: 'success' }),
    onError: (message: string) => setErrorMessage(message),
  });

  const { mutate: submitDelete, isPending: isDeleting } = useDeleteProject({
    onSuccess: () => setModal({ type: 'deleteSuccess' }),
    onError: (message: string) => setErrorMessage(message),
  });

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  }

  function handleSubmit() {
    if (isCompleted) return;
    submitEdit({
      id: project.id,
      name: form.name,
      color: form.color,
      hourlyRate: Number(form.hourlyRate),
      description: form.description,
      startDate: form.startDate,
      clientId: project.clientId,
    });
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const isValid =
    !isCompleted &&
    form.name.trim() !== '' &&
    form.color !== '' &&
    form.startDate.trim() !== '';

  const selectedColor = colorOptions.find(opt => opt.value === form.color);

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Editar projeto</Title>
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
              disabled={isCompleted}
            />
          </Field>

          <Field>
            <Label>Cor</Label>
            <SelectWrapper>
              <Select
                value={form.color}
                onChange={e => handleChange('color', e.target.value)}
                disabled={isCompleted}
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
                {selectedColor ? (
                  <ColorRow>
                    <ColorSwatch $color={selectedColor.value} />
                  </ColorRow>
                ) : (
                  <img
                    src="/img/ChevronDown.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                )}
              </ChevronIcon>
            </SelectWrapper>
          </Field>

          <Field>
            <Label>Descrição (opcional)</Label>
            <Input
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Insira uma descrição"
              disabled={isCompleted}
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
              disabled={isCompleted}
            />
          </Field>

          <Field>
            <Label>Data de início</Label>
            <Input
              type="date"
              value={form.startDate}
              onChange={e => handleChange('startDate', e.target.value)}
              disabled={isCompleted}
            />
          </Field>

          {isCompleted && (
            <ErrorText>Projetos concluídos não podem ser editados.</ErrorText>
          )}
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </ScrollArea>

        <ButtonRow>
          <DeleteButton
            onClick={() => setModal({ type: 'confirmDelete' })}
            disabled={isDeleting || isEditing}
          >
            Excluir projeto
          </DeleteButton>
          <SubmitButton
            onClick={handleSubmit}
            disabled={!isValid || isEditing || isDeleting}
          >
            {isEditing ? 'Salvando...' : 'Salvar alterações'}
          </SubmitButton>
        </ButtonRow>
      </Modal>

      <ConfirmModal
        isOpen={modal.type === 'confirmDelete'}
        variant="danger"
        onClose={() => setModal({ type: 'none' })}
        onConfirm={() => submitDelete(project.id)}
        customTitle="Excluir projeto?"
        message="Você está prestes a excluir este projeto. Tem certeza que deseja continuar?"
        customClose="Cancelar"
        customConfirm="Excluir"
      />

      <ConfirmModal
        isOpen={modal.type === 'success'}
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
        customTitle="Projeto atualizado!"
        message="As alterações foram salvas com sucesso."
        customClose="none"
        customConfirm="Fechar"
      />

      <ConfirmModal
        isOpen={modal.type === 'deleteSuccess'}
        variant="success"
        onClose={() => {
          setModal({ type: 'none' });
          onClose();
          onDeleted?.();
        }}
        onConfirm={() => {
          setModal({ type: 'none' });
          onClose();
          onDeleted?.();
        }}
        customTitle="Projeto excluído!"
        message="O projeto foi excluído com sucesso."
        customClose="none"
        customConfirm="Fechar"
      />
    </Overlay>
  );
}
