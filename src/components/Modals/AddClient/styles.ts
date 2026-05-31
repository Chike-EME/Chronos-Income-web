import styled, { keyframes } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;

  background: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  width: 470px;
  max-height: 90vh;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 24px;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 32px 24px 24px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  margin: 0;

  font-size: 24px;
  font-family: var(--font-poppins);
  font-weight: 600;

  color: ${({ theme }) => theme.colors.primary[100]};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px;
  border-radius: 8px;

  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[20] ?? '#f0f0f0'};
  }
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;

  padding: 0 8px 0 24px;
  margin-right: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary[80]} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary[20] ?? '#e0ede0'};
    border-radius: 99px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary[80]};
    border-radius: 99px;
  }
`;

export const Field = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;

  .icon {
    position: absolute;
    right: 20px;
    bottom: 14px;
    cursor: pointer;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 500;

  color: ${({ theme }) => theme.colors.neutral[80]};
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;

  padding: 0 16px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[40]};
  outline: none;

  background: ${({ theme }) => theme.colors.white};

  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 300;

  color: ${({ theme }) => theme.colors.neutral[100]};

  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[40]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[80]};
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const SubmitButton = styled.button`
  margin: 24px;
  flex-shrink: 0;
  height: 52px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary[80]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 500;
  transition: opacity 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    opacity: 0.92;
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
