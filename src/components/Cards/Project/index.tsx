'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditProjectModal } from '@/components/Modals/EditProjectTimer';
import {
  ProjectCard as ProjectCardType,
  UpdateProjectCardPayload,
} from '@/components/types/calendar/type';
import {
  pauseTimer,
  resumeTimer,
  stopTimerEntry,
} from '@/components/services/calendar/service';
import {
  Card,
  CardHeader,
  ProjectName,
  CardActions,
  ActionButton,
  Description,
  ClientName,
  TimerRow,
  PlayButton,
  TimerDisplay,
} from './styles';
import { Modal } from '@/components/Modals';
import { updateTimeEntry } from '@/components/services/calendar/timer/service';

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'deleteProjectTimer'; id: string }
  | { type: 'confirmStop' }
  | { type: 'error' };

interface ProjectCardProps {
  card: ProjectCardType;
  onDelete: (id: string) => void;
  onUpdated?: (id: string, payload: UpdateProjectCardPayload) => void;
  onStopped?: (id: string) => void;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

export function ProjectCard({
  card,
  onDelete,
  onUpdated,
  onStopped,
}: ProjectCardProps) {
  const [running, setRunning] = useState(card.isRunning);
  const [status, setStatus] = useState(card.status); // RUNNING | PAUSED | STOPPED
  const [seconds, setSeconds] = useState(card.totalSeconds);
  const [editOpen, setEditOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [modal, setModal] = useState<ModalType>({ type: 'none' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const isActive = status === 'RUNNING' || status === 'PAUSED';

  async function handleToggleTimer() {
    if (!running) {
      await resumeTimer(card.id);
      setRunning(true);
      setStatus('RUNNING');
    } else {
      await pauseTimer(card.id);
      setRunning(false);
      setStatus('PAUSED');
    }
  }

  async function handleStop() {
    const entry = await stopTimerEntry(card.id);
    setRunning(false);
    setStatus('STOPPED');
    if (intervalRef.current) clearInterval(intervalRef.current);
    onStopped?.(card.id);
    setModal({ type: 'none' });
  }

  async function handleUpdate(payload: UpdateProjectCardPayload) {
    await updateTimeEntry(card.id, payload);
    onUpdated?.(card.id, payload);
    setEditOpen(false);
  }

  const portals = mounted
    ? createPortal(
        <>
          <EditProjectModal
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
            initialValues={{
              date: card.date,
              startTime: card.startTime ?? '00:00:00',
              endTime: card.endTime ?? '00:00:00',
            }}
            onSubmit={handleUpdate}
          />
          <Modal
            isOpen={modal.type !== 'none'}
            variant={modal.type === 'success' ? 'success' : 'danger'}
            onClose={() => setModal({ type: 'none' })}
            onConfirm={() => {
              if (modal.type === 'deleteProjectTimer') {
                onDelete(modal.id);
              } else if (modal.type === 'confirmStop') {
                handleStop();
              } else {
                setModal({ type: 'none' });
              }
            }}
            customTitle={
              modal.type === 'deleteProjectTimer'
                ? 'Excluir timer?'
                : modal.type === 'confirmStop'
                ? 'Parar timer?'
                : 'Sucesso!'
            }
            message={
              modal.type === 'deleteProjectTimer'
                ? 'Você está prestes a excluir um timer.\nTem certeza que deseja continuar?'
                : modal.type === 'confirmStop'
                ? 'Ao parar o timer, ele será finalizado e não poderá ser retomado. Deseja continuar?'
                : 'Timer excluído com sucesso.'
            }
            customClose={
              modal.type === 'deleteProjectTimer' ||
              modal.type === 'confirmStop'
                ? 'Cancelar'
                : 'none'
            }
            customConfirm={
              modal.type === 'deleteProjectTimer'
                ? 'Excluir'
                : modal.type === 'confirmStop'
                ? 'Parar'
                : 'Fechar'
            }
          />
        </>,
        document.body,
      )
    : null;

  return (
    <>
      <Card $color={card.color}>
        <CardHeader>
          <ProjectName>{card.projectName}</ProjectName>
          <CardActions>
            <ActionButton onClick={() => setEditOpen(true)} aria-label="Editar">
              <img
                src="/img/EditIcon.svg"
                alt="editar"
                width={18}
                height={16}
              />
            </ActionButton>
            <ActionButton
              $danger
              onClick={() =>
                setModal({ type: 'deleteProjectTimer', id: card.id })
              }
              aria-label="Excluir"
            >
              <img
                src="/img/TrashIcon2.svg"
                alt="excluir"
                width={16}
                height={16}
              />
            </ActionButton>
          </CardActions>
        </CardHeader>

        <Description>{card.description}</Description>
        <ClientName>Cliente: {card.clientName}</ClientName>

        <TimerRow>
          {isActive && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <PlayButton
                onClick={handleToggleTimer}
                aria-label={running ? 'Pausar' : 'Retomar'}
              >
                <img
                  src={running ? '/img/PauseIcon.svg' : '/img/PlayIcon.svg'}
                  alt={running ? 'pausar' : 'retomar'}
                  width={14}
                  height={14}
                />
              </PlayButton>
              {!running && (
                <PlayButton
                  onClick={() => setModal({ type: 'confirmStop' })}
                  aria-label="Parar timer"
                >
                  <img
                    src="/img/StopIcon.svg"
                    alt="parar"
                    width={14}
                    height={14}
                  />
                </PlayButton>
              )}
            </div>
          )}

          <TimerDisplay>{formatTime(seconds)}</TimerDisplay>
        </TimerRow>
      </Card>

      {portals}
    </>
  );
}
