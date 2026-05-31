import styled, { keyframes, css } from 'styled-components';

export const ChartCard = styled.div`
  padding: 24px;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ theme }) => theme.colors.neutral[20] ?? '#eee'};
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-family: var(--font-poppins);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[100]};
`;

export const ChartTotal = styled.span`
  font-size: 13px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[60]};
  margin-bottom: 8px;
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerAnimation = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral[40] ?? '#efefef'} 25%,
    ${({ theme }) => theme.colors.neutral[20] ?? '#f8f8f8'} 50%,
    ${({ theme }) => theme.colors.neutral[40] ?? '#efefef'} 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const SkeletonChart = styled.div`
  ${shimmerAnimation}
  width: 200px;
  height: 200px;
  border-radius: 50%;
  align-self: center;
  margin: 16px 0;
`;

export const SkeletonLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

interface SkeletonLineProps {
  $width?: string;
}

export const SkeletonLine = styled.div<SkeletonLineProps>`
  ${shimmerAnimation}
  width: ${({ $width }) => $width ?? '100%'};
  height: 14px;
  border-radius: 8px;
`;
