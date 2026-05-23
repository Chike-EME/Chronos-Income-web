import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 75%;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 46px 0 40px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[40]};
  outline: none;

  font-size: 12px;
  font-family: var(--font-poppins);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[100]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[40]};
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);

  background: transparent;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
