// app/relatorios/styles.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;

  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary[80]}
    transparent;

  &::-webkit-scrollbar {
    width: 4px;
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

export const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
