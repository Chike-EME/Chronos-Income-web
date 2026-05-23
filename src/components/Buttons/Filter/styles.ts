import styled from 'styled-components';

export const Wrapper = styled.div`
  width: auto;
  height: 44px;

  background-color: ${({ theme }) => theme.colors.primary[20]};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[100]};

  padding: 8px 12px;
`;
