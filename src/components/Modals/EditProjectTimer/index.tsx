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
    totalSeconds: number;
  };
  onSubmit: (payload: UpdateProjectCardPayload) => void;
}

function secondsToTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

function timeToSeconds(time: string): number {
  const [h = '0', m = '0', s = '0'] = time.split(':');
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

export function EditProjectModal({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
}: EditProjectModalProps) {
  const [date, setDate] = useState(initialValues.date);
  const [time, setTime] = useState(secondsToTime(initialValues.totalSeconds));

  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleSubmit() {
    onSubmit({ date, totalSeconds: timeToSeconds(time) });
  }

  const isValid = !!date.trim() && /^\d{2}:\d{2}:\d{2}$/.test(time);

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
            <Label>Data</Label>
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Tempo decorrido</Label>
            <Input
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="HH:MM:SS"
            />
          </Field>
        </ScrollArea>

        <SubmitButton onClick={handleSubmit} disabled={!isValid}>
          Salvar
        </SubmitButton>
      </Modal>
    </Overlay>
  );
}
