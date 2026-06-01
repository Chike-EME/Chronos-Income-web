'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditProjectModal } from '@/components/Modals/EditProjectTimer';
import { ProjectCard as ProjectCardType } from '@/components/types/calendar/type';
import {
  startTimer,
  stopTimer,
  updateProjectCard,
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

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'deleteProjectTimer'; id: string }
  | { type: 'error' };

interface ProjectCardProps {
  card: ProjectCardType;
  onDelete: (id: string) => void;
  onUpdated?: (id: string, date: string, totalSeconds: number) => void;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

export function ProjectCard({ card, onDelete, onUpdated }: ProjectCardProps) {
  const [running, setRunning] = useState(card.isRunning);
  const [seconds, setSeconds] = useState(card.totalSeconds);
  const [sessionId, setSessionId] = useState<string | null>(null);
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

  async function handleToggleTimer() {
    if (!running) {
      const res = await startTimer(card.id);
      setSessionId(res.sessionId);
      setRunning(true);
    } else {
      if (sessionId) await stopTimer(card.id, sessionId);
      setRunning(false);
      setSessionId(null);
    }
  }

  async function handleUpdate(payload: { date: string; totalSeconds: number }) {
    await updateProjectCard(card.id, payload);
    setSeconds(payload.totalSeconds);
    onUpdated?.(card.id, payload.date, payload.totalSeconds);
    setEditOpen(false);
  }

  const portals = mounted
    ? createPortal(
        <>
          <EditProjectModal
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
            initialValues={{ date: card.date, totalSeconds: seconds }}
            onSubmit={handleUpdate}
          />
          <Modal
            isOpen={modal.type !== 'none'}
            variant={modal.type === 'success' ? 'success' : 'danger'}
            onClose={() => setModal({ type: 'none' })}
            onConfirm={() => {
              if (modal.type === 'deleteProjectTimer') {
                onDelete(modal.id);
              } else {
                setModal({ type: 'none' });
              }
            }}
            customTitle={
              modal.type === 'deleteProjectTimer'
                ? 'Excluir timer?'
                : 'Sucesso!'
            }
            message={
              modal.type === 'deleteProjectTimer'
                ? 'Você está prestes a excluir um timer.\nTem certeza que deseja continuar?'
                : 'Timer excluído com sucesso.'
            }
            customClose={
              modal.type === 'deleteProjectTimer' ? 'Cancelar' : 'none'
            }
            customConfirm={
              modal.type === 'deleteProjectTimer' ? 'Excluir' : 'Fechar'
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
          <PlayButton
            onClick={handleToggleTimer}
            $running={running}
            aria-label={running ? 'Pausar' : 'Iniciar'}
          >
            <img
              src={running ? '/img/PauseIcon.svg' : '/img/PlayIcon.svg'}
              alt={running ? 'pausar' : 'iniciar'}
              width={14}
              height={14}
            />
          </PlayButton>
          <TimerDisplay>{formatTime(seconds)}</TimerDisplay>
        </TimerRow>
      </Card>

      {portals}
    </>
  );
}
