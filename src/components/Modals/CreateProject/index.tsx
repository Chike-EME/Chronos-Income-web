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
  Select,
  SelectWrapper,
  ChevronIcon,
  SubmitButton,
} from './styles';
import { addClientProject } from '@/components/services/clients/createProject/service';

const colorOptions = [
  { label: 'Azul', value: '#4A90D9' },
  { label: 'Rosa', value: '#C94FC9' },
  { label: 'Laranja', value: '#E8900A' },
  { label: 'Vermelho', value: '#E84545' },
  { label: 'Verde', value: '#4CAF50' },
  { label: 'Roxo', value: '#7C3AED' },
];

export interface AddClientProjectFormData {
  clientId: string;
  name: string;
  color: string;
  description: string;
  hourlyRate: string;
  date: string;
}

interface AddClientProjectModalProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateProjectModal({
  isOpen,
  clientId,
  onClose,
  onSuccess,
}: AddClientProjectModalProps) {
  const [form, setForm] = useState({
    name: '',
    color: '',
    description: '',
    hourlyRate: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      await addClientProject({ clientId, ...form });
      onSuccess?.();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const isValid =
    form.name.trim() !== '' &&
    form.color !== '' &&
    form.date.trim() !== '';

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
            <Label>Descrição (opcional)</Label>
            <Input
              value={form.description}
              onChange={e =>
                handleChange('description', e.target.value)
              }
              placeholder="Insira uma descrição"
            />
          </Field>

          <Field>
            <Label>Valor hora (opcional)</Label>
            <Input
              value={form.hourlyRate}
              onChange={e =>
                handleChange('hourlyRate', e.target.value)
              }
              placeholder="Insira o valor hora"
              type="number"
              min={0}
            />
          </Field>

          <Field>
            <Label>Data</Label>
            <Input
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
              placeholder="DD/MM/AAAA"
            />
          </Field>
        </ScrollArea>

        <SubmitButton
          onClick={handleSubmit}
          disabled={!isValid || loading}
        >
          {loading ? 'Salvando...' : 'Concluir'}
        </SubmitButton>
      </Modal>
    </Overlay>
  );
}
