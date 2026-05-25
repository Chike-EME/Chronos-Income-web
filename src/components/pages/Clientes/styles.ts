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
  overflow-x: hidden;

  padding: 24px;

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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  /* último item sozinho fica na esquerda */
  & > :last-child:nth-child(odd) {
    grid-column: 2 / 3;
  }
`;

export const ClientCard = styled.div`
  padding: 20px;

  background: ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'};
  border: 1px solid ${({ theme }) => theme.colors.primary[40]};
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary[80]};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const ClientName = styled.h3`
  margin: 0;

  font-size: 20px;
  font-family: var(--font-poppins);
  font-weight: 600;

  color: ${({ theme }) => theme.colors.primary[100]};

  line-height: 1.2;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

interface ActionButtonProps {
  $danger?: boolean;
}

export const ActionButton = styled.button<ActionButtonProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  transition: opacity 0.15s ease;

  opacity: 0.75;

  &:hover {
    opacity: 1;
  }

  ${({ $danger }) =>
    $danger &&
    `
    img {
      filter: invert(27%) sepia(90%) saturate(600%) hue-rotate(330deg);
    }
  `}
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const MetaItem = styled.span`
  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 400;

  color: ${({ theme }) => theme.colors.neutral[80]};
`;

export const Description = styled.p`
  margin: 0;

  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 400;
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.neutral[80]};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
