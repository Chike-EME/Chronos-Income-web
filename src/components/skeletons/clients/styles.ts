import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

const shimmerAnimation = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'} 25%,
    ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'} 50%,
    ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'} 75%
  );
  background-size: 1200px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const SkeletonCard = styled.div`
  min-width: 180px;

  padding: 20px;

  background: ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'};
  border: 1px solid ${({ theme }) => theme.colors.primary[40]};
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  flex-shrink: 0;
`;

export const SkeletonCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SkeletonMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface SkeletonLineProps {
  $width?: string;
  $height?: string;
  $radius?: string;
}

export const SkeletonLine = styled.div<SkeletonLineProps>`
  ${shimmerAnimation}

  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '16px'};
  border-radius: ${({ $radius }) => $radius ?? '8px'};

  flex-shrink: 0;
`;
