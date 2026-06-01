// components/Modals/GenerateInvoice/index.tsx
import { useState } from 'react';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Body,
  Footer,
  Field,
  Label,
  Input,
  PeriodRow,
  PeriodField,
  SelectWrapper,
  Select,
  ChevronIcon,
  SubmitButton,
} from './styles';
import { Modal as ConfirmModal } from '@/components/Modals';
import { useProjectOptions } from '@/components/services/calendar/projects/useProjects';
import { createInvoice } from '@/components/services/invoices/service';
import { ErrorText } from '@/styles/global';

interface GenerateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function GenerateInvoiceModal({
  isOpen,
  onClose,
  onSuccess,
}: GenerateInvoiceModalProps) {
  const [form, setForm] = useState({
    projectId: '',
    hourlyRate: '',
    periodStart: '',
    periodEnd: '',
  });
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: projectOptions = [], isLoading: projectsLoading } =
    useProjectOptions();

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  }

  async function handleSubmit() {
    setLoading(true);
    setErrorMessage('');
    try {
      await createInvoice({
        projectId: Number(form.projectId),
        hourlyRate: Number(form.hourlyRate),
        periodStart: form.periodStart,
        periodEnd: form.periodEnd,
      });
      setSuccessOpen(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao gerar invoice.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSuccessConfirm() {
    setSuccessOpen(false);
    setForm({ projectId: '', hourlyRate: '', periodStart: '', periodEnd: '' });
    onClose();
    onSuccess?.();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const isValid =
    form.projectId !== '' &&
    form.periodStart.trim() !== '' &&
    form.periodEnd.trim() !== '';

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Gerar invoice</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        <Body>
          <Field>
            <Label>Período</Label>
            <PeriodRow>
              <PeriodField>
                <Label>De</Label>
                <Input
                  type="date"
                  value={form.periodStart}
                  onChange={e => handleChange('periodStart', e.target.value)}
                />
              </PeriodField>
              <PeriodField>
                <Label>Até</Label>
                <Input
                  type="date"
                  value={form.periodEnd}
                  onChange={e => handleChange('periodEnd', e.target.value)}
                />
              </PeriodField>
            </PeriodRow>
          </Field>

          <Field>
            <Label>Projeto</Label>
            <SelectWrapper>
              <Select
                value={form.projectId}
                onChange={e => handleChange('projectId', e.target.value)}
                disabled={projectsLoading}
              >
                <option value="">
                  {projectsLoading ? 'Carregando...' : 'Selecione'}
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
            <Label>Valor hora (opcional)</Label>
            <Input
              type="number"
              min={0}
              value={form.hourlyRate}
              onChange={e => handleChange('hourlyRate', e.target.value)}
              placeholder="Ex: 150.00"
            />
          </Field>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </Body>

        <Footer>
          <SubmitButton onClick={handleSubmit} disabled={!isValid || loading}>
            {loading ? 'Gerando...' : 'Concluir'}
          </SubmitButton>
        </Footer>
      </Modal>

      <ConfirmModal
        isOpen={successOpen}
        variant="success"
        onClose={handleSuccessConfirm}
        onConfirm={handleSuccessConfirm}
        customTitle="Invoice gerado!"
        message="Seu invoice foi gerado com sucesso e será baixado na sua máquina."
        customClose="none"
        customConfirm="Fechar"
      />
    </Overlay>
  );
}
