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
} from '../AddClient/styles';
import { UpdateProjectCardPayload } from '@/components/types/calendar/type';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: {
    date: string;
    startTime: string; // HH:MM:SS
    endTime: string; // HH:MM:SS
  };
  onSubmit: (payload: UpdateProjectCardPayload) => void;
}

// garante formato HH:MM para input type="time"
function toTimeInput(time: string): string {
  return time.substring(0, 5); // "09:00:00" → "09:00"
}

// adiciona segundos para enviar à API
function toTimeAPI(time: string): string {
  return time.length === 5 ? `${time}:00` : time;
}

export function EditProjectModal({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
}: EditProjectModalProps) {
  const [date, setDate] = useState(initialValues.date);
  const [startTime, setStartTime] = useState(
    toTimeInput(initialValues.startTime),
  );
  const [endTime, setEndTime] = useState(toTimeInput(initialValues.endTime));

  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleSubmit() {
    onSubmit({
      entryDate: date,
      startTime: toTimeAPI(startTime),
      endTime: toTimeAPI(endTime),
    });
  }

  const isValid =
    !!date.trim() &&
    /^\d{2}:\d{2}$/.test(startTime) &&
    /^\d{2}:\d{2}$/.test(endTime) &&
    startTime < endTime;

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Editar timer</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        <ScrollArea>
          <Field>
            <Label>Data</Label>
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Hora de início</Label>
            <Input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Hora de fim</Label>
            <Input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </Field>
          {startTime >= endTime && startTime && endTime && (
            <span style={{ fontSize: 12, color: '#b91c1c' }}>
              Hora de fim deve ser maior que hora de início.
            </span>
          )}
        </ScrollArea>

        <SubmitButton onClick={handleSubmit} disabled={!isValid}>
          Salvar
        </SubmitButton>
      </Modal>
    </Overlay>
  );
}
