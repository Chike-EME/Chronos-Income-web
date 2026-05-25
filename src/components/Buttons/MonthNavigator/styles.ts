import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: 280px;
  height: 44px;

  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.primary[20]};

  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[100]};

  span {
    font-size: 18px;
    font-family: var(--font-poppins);
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary[100]};
  }
`;

export const ArrowButton = styled.img`
  cursor: pointer;
`;
