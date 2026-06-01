'use client';

import Header from '@/components/Header';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  CalendarContainer,
  DayColumn,
  DayNumber,
  HeaderWrapper,
  ScrollArea,
  WeekDay,
  Wrapper,
} from './styles';
import { AddProjectModal } from '@/components/Modals/AddProject';
import { CalendarDay } from '@/components/types/calendar/type';
import { useProjectCards } from '@/components/services/calendar/timer/useTimeEntries';
import { ProjectCard } from '@/components/Cards/Project';
import { useQueryClient } from '@tanstack/react-query';

function getMonthDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];

  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);

    days.push({
      day: String(day).padStart(2, '0'),

      weekDay: date.toLocaleDateString('pt-BR', {
        weekday: 'long',
      }),

      fullDate: date.toISOString().split('T')[0],
    });
  }

  return days;
}

export default function Calendario() {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const todayRef = useRef<HTMLDivElement | null>(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const queryClient = useQueryClient();

  function invalidateCards() {
    queryClient.invalidateQueries({ queryKey: ['calendar', 'cards'] });
  }

  const days = useMemo(() => {
    return getMonthDays(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  function DayCards({ date }: { date: string }) {
    const { cards, remove, update, invalidate } = useProjectCards(date);
    if (!cards.length) return null;

    return (
      <>
        {cards.map(card => (
          <ProjectCard
            key={card.id}
            card={card}
            onDelete={id => remove.mutate(id)}
            onUpdated={(id, payload) => {
              update.mutate({ id, payload });
              invalidate();
            }}
            onStopped={() => invalidate()}
          />
        ))}
      </>
    );
  }

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [days]);

  function onNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
      return;
    }

    setCurrentMonth(prev => prev + 1);
  }

  function onPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
      return;
    }

    setCurrentMonth(prev => prev - 1);
  }

  const monthLabel = new Date(currentYear, currentMonth).toLocaleDateString(
    'pt-BR',
    {
      month: 'long',
      year: 'numeric',
    },
  );

  useEffect(() => {
    if (!scrollRef.current) return;

    const isCurrentMonth =
      currentMonth === today.getMonth() && currentYear === today.getFullYear();

    if (isCurrentMonth) return;

    scrollRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }, [currentMonth, currentYear]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header
          type="Calendário"
          buttonText={monthLabel}
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
          onAddClick={() => setIsAddModalOpen(true)}
        />
      </HeaderWrapper>

      <ScrollArea ref={scrollRef}>
        <CalendarContainer>
          {days.map(item => {
            const isToday = item.fullDate === todayString;

            return (
              <DayColumn
                key={item.fullDate}
                ref={isToday ? todayRef : null}
                $today={isToday}
              >
                <DayNumber>{item.day}</DayNumber>
                <WeekDay style={{ marginBottom: '20px' }}>
                  {item.weekDay.charAt(0).toUpperCase() + item.weekDay.slice(1)}
                </WeekDay>
                <DayCards date={item.fullDate} />
              </DayColumn>
            );
          })}
        </CalendarContainer>
      </ScrollArea>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={() => {
          setIsAddModalOpen(false);
          invalidateCards();
        }}
      />
    </Wrapper>
  );
}
