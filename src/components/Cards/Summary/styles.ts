import styled, { keyframes, css } from 'styled-components';

export const Card = styled.div`
  padding: 24px 20px;

  background: ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'};
  border-radius: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const IconWrapper = styled.div`
  width: 52px;
  height: 52px;

  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardLabel = styled.span`
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary[100]};
  text-align: center;
`;

export const CardValue = styled.span`
  font-size: 20px;
  font-family: var(--font-poppins);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary[100]};
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerAnimation = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'} 25%,
    ${({ theme }) => theme.colors.primary[20] ?? '#dce8db'} 50%,
    ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'} 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const SkeletonLine = styled.div`
  ${shimmerAnimation}
  width: 120px;
  height: 24px;
  border-radius: 8px;
`;
