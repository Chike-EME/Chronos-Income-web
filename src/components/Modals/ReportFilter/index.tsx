import { ReportFilter } from '@/components/types/reports/types';
import {
  Overlay,
  Sidebar,
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
  FilterButton,
  ClearButton,
} from './styles';
import { useState } from 'react';
import { useProjectOptions } from '@/components/services/calendar/useProjects';

interface ReportFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filter: Partial<ReportFilter>) => void;
}

const EMPTY: Partial<ReportFilter> = {
  dateFrom: '',
  dateTo: '',
  clientName: '',
  projectId: '',
};

export function ReportFilterModal({
  isOpen,
  onClose,
  onApply,
}: ReportFilterModalProps) {
  const [form, setForm] = useState<Partial<ReportFilter>>(EMPTY);
  const { data: projectOptions = [], isLoading: projectsLoading } =
    useProjectOptions();

  if (!isOpen) return null;

  function handleChange(field: keyof ReportFilter, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleApply() {
    onApply(form);
    onClose();
  }

  function handleClear() {
    setForm(EMPTY);
    onApply(EMPTY);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <Sidebar>
        <Header>
          <Title>Filtro</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img
              src="/img/CloseIcon.svg"
              alt="fechar"
              width={24}
              height={24}
            />
          </CloseButton>
        </Header>

        <Body>
          <Field>
            <Label>Período</Label>
            <PeriodRow>
              <PeriodField>
                <Label>De</Label>
                <Input
                  value={form.dateFrom ?? ''}
                  onChange={e =>
                    handleChange('dateFrom', e.target.value)
                  }
                  placeholder="DD/MM/AAAA"
                />
              </PeriodField>
              <PeriodField>
                <Label>Até</Label>
                <Input
                  value={form.dateTo ?? ''}
                  onChange={e =>
                    handleChange('dateTo', e.target.value)
                  }
                  placeholder="DD/MM/AAAA"
                />
              </PeriodField>
            </PeriodRow>
          </Field>

          <Field>
            <Label>Nome do Cliente</Label>
            <Input
              value={form.clientName ?? ''}
              onChange={e =>
                handleChange('clientName', e.target.value)
              }
              placeholder="Insira o nome do cliente"
            />
          </Field>

          <Field>
            <Label>Projeto</Label>
            <SelectWrapper>
              <Select
                value={form.projectId ?? ''}
                onChange={e =>
                  handleChange('projectId', e.target.value)
                }
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
                <img
                  src="/img/ChevronDown.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </ChevronIcon>
            </SelectWrapper>
          </Field>
        </Body>

        <Footer>
          <FilterButton onClick={handleApply}>Filtrar</FilterButton>
          <ClearButton onClick={handleClear}>Limpar</ClearButton>
        </Footer>
      </Sidebar>
    </Overlay>
  );
}
