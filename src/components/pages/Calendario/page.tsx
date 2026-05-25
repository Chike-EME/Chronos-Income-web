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

  const days = useMemo(() => {
    return getMonthDays(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

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

  const monthLabel = new Date(
    currentYear,
    currentMonth,
  ).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    const isCurrentMonth =
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

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

                <WeekDay>
                  {item.weekDay.charAt(0).toUpperCase() +
                    item.weekDay.slice(1)}
                </WeekDay>
              </DayColumn>
            );
          })}
        </CalendarContainer>
      </ScrollArea>
    </Wrapper>
  );
}
