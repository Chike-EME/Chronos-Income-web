import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
`;

export const Sidebar = styled.div`
  width: 360px;
  height: 100%;

  background: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;

  animation: slideIn 0.25s ease;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 24px 20px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 22px;
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

export const Body = styled.div`
  flex: 1;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

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

export const Footer = styled.div`
  padding: 20px 24px 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-family: var(--font-poppins);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[80]};
`;

export const PeriodRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const PeriodField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[40]};
  outline: none;
  background: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-family: var(--font-lato);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.neutral[100]};
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[40]};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[80]};
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  height: 46px;
  padding: 0 40px 0 14px;
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
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[80]};
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

export const FilterButton = styled.button`
  height: 50px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary[80]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
  &:active {
    opacity: 0.85;
  }
`;

export const ClearButton = styled.button`
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[40]};
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral[80]};
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 500;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.neutral[80]};
    color: ${({ theme }) => theme.colors.neutral[100]};
  }
`;
