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
    background: ${({ theme }) =>
      theme.colors.primary[40] ?? '#c5dcc4'};
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
  gap: 6px;

  min-height: 160px;
`;

export const ProjectName = styled.span`
  font-size: 15px;
  font-family: var(--font-poppins);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const ProjectDescription = styled.span`
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
    background: ${({ theme }) =>
      theme.colors.primary[40] ?? '#c5dcc4'};

    transform: translateY(-2px);
  }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerAnimation = css`
  background: linear-gradient(
    90deg,
    #c5dcc4 25%,
    #dce8db 50%,
    #c5dcc4 75%
  );
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
