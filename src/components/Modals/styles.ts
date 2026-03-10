import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalBox = styled.div`
  width: 470px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90vw;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
    font-family: var(--font-poppins);
    color: ${({ theme }) => theme.colors.neutral100};
  }

  p,
  h3 {
    font-size: 16px;
    font-weight: 400;
    font-family: var(--font-lato);
    color: ${({ theme }) => theme.colors.neutral80};
    margin: 0;
  }
`;

export const IconWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

export const Button = styled.button<{
  $primary?: boolean;
  $borderColor?: string;
}>`
  ${({ $primary, $borderColor }) => css`
    font-family: var(--font-poppins);
    border: none;
    border-radius: 12px;

    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    width: 203px;
    height: 40px;
    border: solid 1px ${$borderColor || 'transparent'};
    ${$primary
      ? css`
          color: white;
        `
      : css`
          background: transparent;
        `}
    &:hover {
      opacity: 0.85;
    }
  `}
`;
