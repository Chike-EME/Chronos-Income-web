import styled from 'styled-components';

interface CardProps {
  $color?: string;
}

export const Card = styled.div<CardProps>`
  width: 100%;
  margin-top: 20px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ $color, theme }) => $color ?? theme.colors.primary[80]};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

export const ProjectName = styled.span`
  font-size: 15px;
  font-family: var(--font-poppins);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.2;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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
  border-radius: 4px;
  opacity: 0.85;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }

  /* ícone de editar: branco */
  img {
    filter: brightness(0) invert(1);
  }

  /* ícone de excluir: vermelho */
  ${({ $danger }) =>
    $danger &&
    `
    img { filter: invert(27%) sepia(90%) saturate(600%) hue-rotate(330deg); }
  `}
`;

export const Description = styled.p`
  margin: 0;
  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
  line-height: 1.4;
`;

export const ClientName = styled.span`
  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
`;

export const TimerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

interface PlayButtonProps {
  $running: boolean;
}

export const PlayButton = styled.button<PlayButtonProps>`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, transform 0.15s ease;

  img {
    filter: brightness(0) invert(1);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.08);
  }
`;

export const TimerDisplay = styled.span`
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 1px;
`;
