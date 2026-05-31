import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  flex-shrink: 0;

  background: ${({ theme }) => theme.colors.white};

  z-index: 2;
`;

export const ScrollArea = styled.div`
  flex: 1;

  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary[80]}
    transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.colors.primary[20] ?? '#e0ede0'};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary[80]};
    border-radius: 999px;
  }
`;

export const CalendarContainer = styled.div`
  display: flex;
  gap: 8px;

  min-width: max-content;

  padding: 8px 8px 16px;
`;

interface DayColumnProps {
  $today?: boolean;
}

export const DayColumn = styled.div<DayColumnProps>`
  width: 200px;
  min-height: calc(100vh - 220px);

  background: ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'};

  border: 1px solid ${({ theme }) => theme.colors.primary[40]};

  border-radius: 18px;

  padding: 16px;

  flex-shrink: 0;

  cursor: pointer;

  transition: transform 0.18s ease, border-color 0.18s ease,
    box-shadow 0.18s ease;

  animation: ${({ $today }) => ($today ? pulse : 'none')} 2s infinite;

  &:hover {
    transform: translateY(-2px);

    border-color: ${({ theme }) => theme.colors.primary[80]};

    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.12);
  }

  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

export const DayHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  margin-bottom: 16px;
`;

export const DayNumber = styled.div`
  font-size: 30px;
  line-height: 1;

  font-family: var(--font-poppins);
  font-weight: 700;

  color: ${({ theme }) => theme.colors.primary[100]};
`;

export const WeekDay = styled.div`
  font-size: 16px;
  line-height: 1.3;

  font-family: var(--font-lato);
  font-weight: 400;

  color: ${({ theme }) => theme.colors.neutral[80]};

  text-transform: capitalize;
`;

export const DayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EventCard = styled.div`
  width: 100%;

  padding: 10px 12px;

  border-radius: 12px;

  background: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.primary[20]};

  display: flex;
  flex-direction: column;
  gap: 4px;

  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[60]};
    transform: scale(1.01);
  }
`;

export const EventTitle = styled.span`
  font-size: 14px;

  font-family: var(--font-poppins);
  font-weight: 500;

  color: ${({ theme }) => theme.colors.neutral[100]};
`;

export const EventTime = styled.span`
  font-size: 12px;

  font-family: var(--font-lato);
  font-weight: 400;

  color: ${({ theme }) => theme.colors.neutral[60]};
`;

export const EmptyState = styled.div`
  width: 100%;

  padding: 14px 12px;

  border-radius: 12px;

  border: 1px dashed ${({ theme }) => theme.colors.neutral[40]};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;

  font-family: var(--font-lato);
  font-weight: 400;

  color: ${({ theme }) => theme.colors.neutral[60]};

  background: ${({ theme }) => theme.colors.neutral[20] ?? '#fafafa'};
`;
