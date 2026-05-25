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
    background: ${({ theme }) =>
      theme.colors.primary[20] ?? '#f0f0f0'};
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
  scrollbar-color: ${({ theme }) => theme.colors.primary[80]}
    transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.colors.primary[20] ?? '#e0ede0'};
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

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;

  padding: 0 44px 0 16px;

  appearance: none;
  -webkit-appearance: none;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[40]};
  outline: none;

  background: ${({ theme }) => theme.colors.white};

  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 300;

  color: ${({ theme }) => theme.colors.neutral[100]};

  cursor: pointer;

  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[80]};
  }

  &:valid {
    color: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

export const ChevronIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);

  pointer-events: none;

  display: flex;
  align-items: center;
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

interface DisplayFieldProps {
  $empty?: boolean;
}

export const DisplayField = styled.div<DisplayFieldProps>`
  width: 100%;
  height: 48px;
  padding: 0 16px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[40]};
  background: ${({ theme }) => theme.colors.neutral[20] ?? '#f8f8f8'};

  display: flex;
  align-items: center;

  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 300;

  color: ${({ $empty, theme }) =>
    $empty ? theme.colors.neutral[40] : theme.colors.neutral[100]};
`;

export const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface ColorSwatchProps {
  $color: string;
}

export const ColorSwatch = styled.div<ColorSwatchProps>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
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

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

export const LoadingShimmer = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 12px;

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral[40] ?? '#efefef'} 25%,
    ${({ theme }) => theme.colors.neutral[20] ?? '#f8f8f8'} 50%,
    ${({ theme }) => theme.colors.neutral[40] ?? '#efefef'} 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;
