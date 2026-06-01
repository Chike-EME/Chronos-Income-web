import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
   scroll-behavior: smooth;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  html {
    @media (max-width: 1440px) {
      font-size: 93.75%;
    }
  }
  body {
    text-rendering: optimizeLegibility;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
  button {
    cursor: pointer;
  }
`;

export const PageHeaderFooter = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px 24px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 66px;
  margin-bottom: 24px;
`;

export const Title = styled.div`
  font-family: var(--font-poppins);
  color: ${({ theme }) => theme.colors.neutral[100]};
  width: 500px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    font-size: 24px;
    font-weight: 600;
  }

  span {
    font-size: 14px;
    font-family: var(--font-poppins);
    font-weight: 400;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-poppins);
  font-size: 16px;
  font-weight: 400;

  &.outline {
    background: ${({ theme }) => theme.colors.white};
    border: solid 1px ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[100]};
    &:hover {
      background: rgba(26 64 41 20%);
    }
  }

  &.colored {
    background: ${({ theme }) => theme.colors.primary[100]};
    border: none;
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      background: #182b1c;
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[60]};
    border: none;
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[60]};
      cursor: not-allowed;
    }
  }
`;

export const Label = styled.p`
  width: 100%;
  height: 26px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.neutral[80]};

  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 400;
`;

export const Input = styled.input.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error.main : theme.colors.neutral[20]};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  padding: 0 1rem;
  width: 100%;
  height: 44px;
  margin-top: 8px;

  font-size: 16px;
  font-family: var(--font-lato);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[80]};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[20]};
    font-weight: 400;
  }

  &:focus-visible {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  top: 50px;
  left: 4px;

  font-size: 16;
  font-family: var(--font-poppins);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.error.main};
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: 13px;
  font-family: var(--font-lato);
  color: ${({ theme }) => theme.colors.error};
  padding: 8px 12px;
  border-radius: 8px;
  background: #fde8e8;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;

  min-width: 24px;
  min-height: 24px;

  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 4px;

  cursor: pointer;
  position: relative;

  &:checked::after {
    content: '';
    position: absolute;

    width: 24px;
    height: 24px;

    background-image: url('/img/Checkbox.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const DividerHorizontal = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.secondary[20]};
`;

export const DividerVertical = styled.div`
  width: 1px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.secondary[20]};
  align-self: stretch;
  margin-left: 28px;
  margin-right: 28px;
`;

export const ProjectsRow = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 16px;

  margin-top: 16px;

  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ClientInfo = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 28px 28px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary[80]} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary[40] ?? '#c5dcc4'};
    border-radius: 99px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary[80]};
    border-radius: 99px;
  }
`;
