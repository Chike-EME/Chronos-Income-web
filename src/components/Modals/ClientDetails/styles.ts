import styled, { css, keyframes } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  width: 860px;
  max-width: 95vw;
  max-height: 90vh;

  background: ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'};
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 28px 16px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-family: var(--font-poppins);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary[100]};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'};
  }
`;

export const InfoText = styled.p`
  margin: 0;
  font-size: 15px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[100]};
  line-height: 1.5;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const MetaItem = styled.span`
  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[80]};
`;

interface ProjectCardProps {
  $color: string;
}

export const ProjectCard = styled.div<ProjectCardProps>`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  background: ${({ $color }) => $color};

  display: flex;
  flex-direction: column;
  gap: 10px;

  min-height: 160px;
`;

// Header interno do card para alinhar nome + botão editar
export const ProjectCardHeader = styled.div`
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
  flex: 1;
`;

export const EditButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border-radius: 8px;

  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;

export const ProjectDescription = styled.span`
  flex: 1;
  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
  line-height: 1.4;
`;

export const ProjectMeta = styled.span`
  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.4;

  strong {
    font-weight: 700;
  }
`;

export const AddProjectButton = styled.button`
  width: 100%;
  min-height: 160px;

  border-radius: 16px;
  border: 2px dashed ${({ theme }) => theme.colors.neutral[80]};

  background: transparent;

  font-size: 42px;
  color: ${({ theme }) => theme.colors.neutral[80]};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: background 0.15s ease, transform 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'};
    transform: translateY(-2px);
  }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerAnimation = css`
  background: linear-gradient(90deg, #c5dcc4 25%, #dce8db 50%, #c5dcc4 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

interface ShimmerRowProps {
  $width?: string;
}

export const ShimmerRow = styled.div<ShimmerRowProps>`
  ${shimmerAnimation}
  height: 20px;
  width: ${({ $width }) => $width ?? '100%'};
  border-radius: 12px;
`;

export const LoadingShimmer = styled.div`
  ${shimmerAnimation}
  min-width: 160px;
  height: 160px;
  border-radius: 16px;
`;

export const BadgeWrapper = styled.div`
  position: relative;
  align-self: flex-start;
`;

interface BadgeProps {
  $bg: string;
  $dot: string;
  $clickable: boolean;
}

export const Badge = styled.button<BadgeProps>`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 4px 10px;
  border-radius: 999px;
  border: none;
  background: ${({ $bg }) => $bg};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  font-size: 12px;
  font-family: var(--font-lato);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  transition: opacity 0.15s;

  &:hover {
    opacity: ${({ $clickable }) => ($clickable ? 0.85 : 1)};
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $dot }) => $dot};
    flex-shrink: 0;
  }

  .chevron {
    font-size: 8px;
    opacity: 0.8;
    margin-left: 2px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  min-width: 130px;
`;

interface DropdownItemProps {
  $dot: string;
  $active: boolean;
}

export const DropdownItem = styled.button<DropdownItemProps>`
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.neutral[20] ?? '#f5f5f5' : 'transparent'};
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme }) => theme.colors.neutral[100]};

  transition: background 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[20] ?? '#f5f5f5'};
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $dot }) => $dot};
    flex-shrink: 0;
  }
`;
