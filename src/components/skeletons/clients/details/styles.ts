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

interface SkeletonLineProps {
  $width?: string;
  $height?: string;
}

export const SkeletonLine = styled.div<SkeletonLineProps>`
  ${shimmerAnimation}
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '16px'};
  border-radius: 8px;
  flex-shrink: 0;
`;

export const SkeletonCard = styled.div`
  min-width: 160px;
  max-width: 180px;
  flex-shrink: 0;

  padding: 14px;
  border-radius: 16px;

  /* tom levemente mais escuro que o fundo do modal */
  background: ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'};

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SkeletonMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
