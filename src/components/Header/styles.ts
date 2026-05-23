import styled from 'styled-components';

export const Wrapper = styled.div`
  width: auto;
  height: 116px;

  margin: 32px 20px 24px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.span`
  width: auto;
  height: 48px;

  font-size: 32px;
  font-family: var(--font-poppins);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary[100]};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
