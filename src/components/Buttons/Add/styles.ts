import styled from 'styled-components';

export const Wrapper = styled.div`
  width: auto;
  height: 44px;

  padding: 0 14px 0 9px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.secondary[20]};

  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.secondary[100]};

  cursor: pointer;

  span {
    font-size: 18px;
    font-family: var(--font-poppins);
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary[100]};
  }
`;
