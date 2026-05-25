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
  Select,
  SelectWrapper,
  ChevronIcon,
  Input,
  DisplayField,
  ColorSwatch,
  ColorRow,
  SubmitButton,
  LoadingShimmer,
} from './styles';
import {
  ProjectFormData,
  ProjectDetails,
  ProjectSelectOption,
} from '@/components/types/calendar/addProject';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  projectOptions?: ProjectSelectOption[];
  fetchProjectDetails: (id: string) => Promise<ProjectDetails>;
}

export function AddProjectModal({
  isOpen,
  onClose,
  onSubmit,
  projectOptions = [],
  fetchProjectDetails,
}: AddProjectModalProps) {
  const [selectedId, setSelectedId] = useState('');
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  if (!isOpen) return null;

  async function handleProjectChange(id: string) {
    setSelectedId(id);
    setDetails(null);

    if (!id) return;

    setLoading(true);
    try {
      const data = await fetchProjectDetails(id);
      setDetails(data);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    if (!details) return;
    onSubmit({
      projectId: selectedId,
      client: details.client,
      projectName: details.name,
      color: details.color,
      description: details.description ?? '',
      hourlyRate: details.hourlyRate ?? '',
      date,
    });
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const ready = !!details && !loading;

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Adicionar projeto</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img
              src="/img/CloseIcon.svg"
              alt="fechar"
              width={24}
              height={24}
            />
          </CloseButton>
        </Header>

        <ScrollArea>
          <Field>
            <Label>Projeto</Label>

            <SelectWrapper>
              <Select
                value={selectedId}
                onChange={e => handleProjectChange(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>

                {projectOptions.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>

              <ChevronIcon>
                <img
                  src="/img/ChevronDown.svg"
                  alt=""
                  width={16}
                  height={16}
                />
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

            {loading ? (
              <LoadingShimmer />
            ) : (
              <DisplayField $empty={!details}>
                {details?.client ?? 'Selecione um projeto'}
              </DisplayField>
            )}
          </Field>

          <Field>
            <Label>Valor hora</Label>

            {loading ? (
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

            {loading ? (
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

            {loading ? (
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
          disabled={!ready || !date}
        >
          Concluir
        </SubmitButton>
      </Modal>
    </Overlay>
  );
}
