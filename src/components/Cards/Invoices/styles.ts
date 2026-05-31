// components/Cards/InvoiceCard/styles.ts
import styled from 'styled-components';

export const Card = styled.div`
  position: relative;

  padding: 18px 20px;

  background: ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'};
  border: 1px solid ${({ theme }) => theme.colors.primary[40]};
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary[80]};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

export const CardTitle = styled.h3`
  margin: 0;

  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 600;

  color: ${({ theme }) => theme.colors.primary[100]};

  /* espaço para os botões no canto */
  padding-right: 60px;
`;

export const CardProject = styled.span`
  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[80]};
`;

export const CardDate = styled.span`
  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[60]};
`;

export const CardActions = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;

  display: flex;
  align-items: center;
  gap: 8px;
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
  opacity: 0.75;

  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${({ $danger }) =>
    $danger &&
    `img { filter: invert(27%) sepia(90%) saturate(600%) hue-rotate(330deg); }`}
`;
