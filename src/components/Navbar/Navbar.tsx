// navbar/index.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  ButtonsContainer,
  Container,
  LogoContainer,
  NavbarButton,
  LogoutButton,
  Wrapper,
} from './styles';

const navItems = [
  {
    href: '/calendario',
    label: 'Calendário',
    icon: '/img/navbar/CalendarIcon.svg',
  },
  {
    href: '/clientes',
    label: 'Clientes',
    icon: '/img/navbar/ClientsIcon.svg',
  },
  {
    href: '/relatorios',
    label: 'Relatórios',
    icon: '/img/navbar/ReportsIcon.svg',
  },
  {
    href: '/invoice',
    label: 'Invoice',
    icon: '/img/navbar/InvoiceIcon.svg',
  },
];

export default function Navbar() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const handleMouseEnter = () => setExpanded(true);
    const handleMouseLeave = () => setExpanded(false);

    navbar.addEventListener('mouseenter', handleMouseEnter);
    navbar.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      navbar.removeEventListener('mouseenter', handleMouseEnter);
      navbar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Wrapper ref={navbarRef} $open={expanded}>
      <Container $grow>
        <LogoContainer>
          <img
            className={`logo expanded ${expanded ? 'visible' : ''}`}
            src="/img/navbar/LogoExpanded.svg"
            alt="Chronos Income"
          />

          <img
            className={`logo mini ${!expanded ? 'visible' : ''}`}
            src="/img/navbar/LogoMini.svg"
            alt="Chronos Income"
          />
        </LogoContainer>
        <ButtonsContainer>
          {navItems.map(({ href, label, icon }) => (
            <NavbarButton
              key={href}
              href={href}
              $open={expanded}
              $active={pathname === href}
            >
              <img src={icon} alt={label} width={24} height={24} />
              {expanded && <span className="label">{label}</span>}
            </NavbarButton>
          ))}
        </ButtonsContainer>
      </Container>

      <Container>
        <ButtonsContainer>
          <LogoutButton onClick={logout} $open={expanded}>
            <img
              src="/img/navbar/ExitIcon.svg"
              alt="Sair"
              width={24}
              height={24}
            />
            {expanded && <span className="label">Sair</span>}
          </LogoutButton>
        </ButtonsContainer>
      </Container>
    </Wrapper>
  );
}
