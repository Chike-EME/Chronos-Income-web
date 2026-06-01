import {
  useProjectDetails,
  useProjectOptions,
} from '@/components/services/calendar/useProjects';
import { ProjectFormData } from '@/components/types/calendar/type';
import { useState } from 'react';
import {
  ChevronIcon,
  CloseButton,
  ColorRow,
  ColorSwatch,
  DisplayField,
  Field,
  Header,
  Input,
  Label,
  LoadingShimmer,
  ModalContainer,
  Overlay,
  ScrollArea,
  Select,
  SelectWrapper,
  SubmitButton,
  Title,
} from './styles';
import { addProject } from '@/components/services/calendar/service';
import { Modal } from '..';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

type ModalType = { type: 'none' } | { type: 'success' } | { type: 'error' };

export function AddProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: AddProjectModalProps) {
  const [selectedId, setSelectedId] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [modal, setModal] = useState<ModalType>({ type: 'none' });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const { data: projectOptions = [], isLoading: optionsLoading } =
    useProjectOptions();
  const { data: details, isFetching: detailsLoading } =
    useProjectDetails(selectedId);

  if (!isOpen) return null;

  const ready = !!details && !detailsLoading;

  function handleProjectChange(id: string) {
    setSelectedId(id);
  }

  async function handleSubmit() {
    if (!details || !selectedId || !date) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await addProject({
        projectId: selectedId,
        date,
      });
      setFeedback({
        success: response.success,
        message: response.message,
      });

      if (response.success) {
        setModal({ type: 'success' });
        setTimeout(() => {
          setFeedback(null);
          setSelectedId('');
          setDate(today);
        }, 1200);
      } else {
        setModal({ type: 'error' });
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <Header>
          <Title>Adicionar projeto</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        <ScrollArea>
          <Field>
            <Label>Projeto</Label>
            <SelectWrapper>
              <Select
                value={selectedId}
                onChange={e => handleProjectChange(e.target.value)}
                disabled={optionsLoading}
              >
                <option value="" disabled>
                  {optionsLoading ? 'Carregando...' : 'Selecione'}
                </option>
                {projectOptions.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
              <ChevronIcon>
                <img src="/img/ChevronDown.svg" alt="" width={16} height={16} />
              </ChevronIcon>
            </SelectWrapper>
          </Field>

          <Field>
            <Label>Data</Label>
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              disabled={!ready}
            />
          </Field>

          <Field>
            <Label>Cliente</Label>
            {detailsLoading ? (
              <LoadingShimmer />
            ) : (
              <DisplayField $empty={!details}>
                {details?.client ?? 'Selecione um projeto'}
              </DisplayField>
            )}
          </Field>

          <Field>
            <Label>Valor hora</Label>
            {detailsLoading ? (
              <LoadingShimmer />
            ) : (
              <DisplayField $empty={!details?.hourlyRate}>
                {details?.hourlyRate
                  ? `R$ ${details.hourlyRate}`
                  : 'Não informado'}
              </DisplayField>
            )}
          </Field>

          <Field>
            <Label>Cor</Label>
            {detailsLoading ? (
              <LoadingShimmer />
            ) : (
              <DisplayField $empty={!details}>
                {details ? (
                  <ColorRow>
                    <ColorSwatch $color={details.color} />
                    {details.colorLabel ?? details.color}
                  </ColorRow>
                ) : (
                  'Selecione um projeto'
                )}
              </DisplayField>
            )}
          </Field>

          <Field>
            <Label>Descrição</Label>
            {detailsLoading ? (
              <LoadingShimmer />
            ) : (
              <DisplayField $empty={!details?.description}>
                {details?.description || 'Sem descrição'}
              </DisplayField>
            )}
          </Field>
        </ScrollArea>

        <SubmitButton onClick={handleSubmit} disabled={!ready || !date}>
          Concluir
        </SubmitButton>
      </ModalContainer>
      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => {
          setModal({ type: 'none' });
          if (modal.type === 'success') {
          }
        }}
        onConfirm={() => {
          if (modal.type === 'error') {
            setModal({ type: 'none' });
          } else {
            setModal({ type: 'none' });
            onClose();
          }
        }}
        customTitle={modal.type === 'success' ? 'Projeto vinculado!' : 'Erro'}
        message={
          modal.type === 'success'
            ? 'Projeto vinculado ao dia selecionado com sucesso.'
            : 'Erro ao vincular projeto, por favor tente novamente.'
        }
        customClose="none"
        customConfirm={modal.type === 'success' ? 'Fechar' : 'Voltar'}
      />
    </Overlay>
  );
}
