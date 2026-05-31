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
import { generateInvoice } from '@/components/services/invoices/service';

const mockClients = [
  { id: '1', name: 'Ágatha Jamille' },
  { id: '2', name: 'Carla Franco' },
  { id: '3', name: 'Guilherme Mendes' },
];

const mockProjects = [
  { id: '1', name: 'Projeto 1' },
  { id: '2', name: 'Projeto 2' },
  { id: '3', name: 'Projeto 3' },
];

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
    dateFrom: '',
    dateTo: '',
    clientId: '',
    projectId: '',
  });
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      await generateInvoice(form);
      setSuccessOpen(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSuccessConfirm() {
    setSuccessOpen(false);
    setForm({ dateFrom: '', dateTo: '', clientId: '', projectId: '' });
    onClose();
    onSuccess?.();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const isValid = form.dateFrom.trim() !== '' && form.dateTo.trim() !== '';

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
                  value={form.dateFrom}
                  onChange={e => handleChange('dateFrom', e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </PeriodField>
              <PeriodField>
                <Label>Até</Label>
                <Input
                  value={form.dateTo}
                  onChange={e => handleChange('dateTo', e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </PeriodField>
            </PeriodRow>
          </Field>

          <Field>
            <Label>Cliente</Label>
            <SelectWrapper>
              <Select
                value={form.clientId}
                onChange={e => handleChange('clientId', e.target.value)}
              >
                <option value="">Selecione</option>
                {mockClients.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <ChevronIcon>
                <img src="/img/ChevronDown.svg" alt="" width={16} height={16} />
              </ChevronIcon>
            </SelectWrapper>
          </Field>

          <Field>
            <Label>Projeto</Label>
            <SelectWrapper>
              <Select
                value={form.projectId}
                onChange={e => handleChange('projectId', e.target.value)}
              >
                <option value="">Selecione</option>
                {mockProjects.map(p => (
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
