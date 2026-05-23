// navbar/styles.ts
import Link from 'next/link';
import styled, { css } from 'styled-components';

interface NavbarProps {
  $open: boolean;
}

interface ContainerProps {
  $grow?: boolean;
}

interface NavbarButtonProps extends NavbarProps {
  $active?: boolean;
}

export const Wrapper = styled.div<NavbarProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: ${({ $open }) => ($open ? '260px' : '88px')};
  height: 100%;

  flex-shrink: 0;

  background-color: ${({ theme }) => theme.colors.primary[80]};
  box-shadow: 0px 4px 16px 0px #00000029;

  padding: 32px 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: width 0.25s ease;
  overflow: hidden;
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;
  ${({ $grow }) =>
    $grow &&
    css`
      flex: 1;
    `}
`;

export const LogoContainer = styled.div`
  position: relative;

  height: 109px;
  margin-bottom: 71px;

  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    position: absolute;

    transition: opacity 0.25s ease, transform 0.25s ease;

    opacity: 0;
    pointer-events: none;
  }

  .logo.visible {
    opacity: 1;
    transform: scale(1);
  }

  .expanded {
    width: 228px;
    height: 109px;

    transform: scale(0.95);
  }

  .mini {
    width: 72px;
    height: 72px;

    transform: scale(0.85);
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const buttonBase = css<NavbarProps>`
  position: relative;
  padding: 0 1rem;
  height: 40px;
  width: calc(100%-16px);
  margin: 0px 8px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary[40]};
  border: none;
  cursor: pointer;

  text-decoration: none;
  white-space: nowrap;

  .icon {
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .label {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.primary[100]};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transition: opacity 0.15s ease;
  }

  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.colors.primary[60] ?? 'rgba(255,255,255,0.08)'};
  }
`;

export const NavbarButton = styled(Link)<NavbarButtonProps>`
  ${buttonBase}

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primary[60] ??
      'rgba(255,255,255,0.15)'};
    `}
`;

export const LogoutButton = styled.button<NavbarProps>`
  ${buttonBase}

  .label {
    color: ${({ theme }) => theme.colors.error ?? '#ff6b6b'};
  }

  &:hover {
    background: rgba(255, 107, 107, 0.1);
  }
`;
