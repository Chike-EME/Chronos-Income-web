import {
  useProjectDetails,
  useProjectOptions,
} from '@/components/services/calendar/projects/useProjects';
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
import { createTimer } from '@/components/services/calendar/projects/service';
import { Modal } from '..';
import { useQueryClient } from '@tanstack/react-query';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

type ModalType = { type: 'none' } | { type: 'success' } | { type: 'error' };

export function AddProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: AddProjectModalProps) {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [timerDescription, setTimerDescription] = useState('');
  const [modal, setModal] = useState<ModalType>({ type: 'none' });
  const [submitting, setSubmitting] = useState(false);

  const { data: projectOptions = [], isLoading: optionsLoading } =
    useProjectOptions();
  const { data: details, isFetching: detailsLoading } =
    useProjectDetails(selectedId);

  if (!isOpen) return null;

  const ready = !!details && !detailsLoading;

  async function handleSubmit() {
    if (!selectedId || !date) return;

    setSubmitting(true);
    try {
      await createTimer({
        projectId: Number(selectedId),
        entryDate: date,
        description: timerDescription.trim() || details?.description || '',
        startPaused: true,
      });

      queryClient.invalidateQueries({ queryKey: ['calendar', 'cards', date] });

      setModal({ type: 'success' });
    } catch {
      setModal({ type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setSelectedId('');
    setDate(today);
    setTimerDescription('');
    setModal({ type: 'none' });
    onClose();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleClose();
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <Header>
          <Title>Adicionar projeto</Title>
          <CloseButton onClick={handleClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        <ScrollArea>
          <Field>
            <Label>Projeto</Label>
            <SelectWrapper>
              <Select
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
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
            <Label>Descrição do timer (opcional)</Label>
            <Input
              value={timerDescription}
              onChange={e => setTimerDescription(e.target.value)}
              placeholder="Ex: Desenvolvimento backend"
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
                    {details.color}
                  </ColorRow>
                ) : (
                  'Selecione um projeto'
                )}
              </DisplayField>
            )}
          </Field>

          <Field>
            <Label>Descrição do projeto</Label>
            {detailsLoading ? (
              <LoadingShimmer />
            ) : (
              <DisplayField $empty={!details?.description}>
                {details?.description || 'Sem descrição'}
              </DisplayField>
            )}
          </Field>
        </ScrollArea>

        <SubmitButton
          onClick={handleSubmit}
          disabled={!ready || !date || submitting}
        >
          {submitting ? 'Salvando...' : 'Concluir'}
        </SubmitButton>
      </ModalContainer>

      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => {
          setModal({ type: 'none' });
          if (modal.type === 'success') handleClose();
        }}
        onConfirm={() => {
          if (modal.type === 'success') {
            setModal({ type: 'none' });
            handleClose();
            onSubmit();
          } else setModal({ type: 'none' });
        }}
        customTitle={modal.type === 'success' ? 'Timer criado!' : 'Erro'}
        message={
          modal.type === 'success'
            ? 'Timer iniciado com sucesso. O card aparecerá no dia selecionado.'
            : 'Erro ao criar timer, por favor tente novamente.'
        }
        customClose="none"
        customConfirm={modal.type === 'success' ? 'Fechar' : 'Voltar'}
      />
    </Overlay>
  );
}
