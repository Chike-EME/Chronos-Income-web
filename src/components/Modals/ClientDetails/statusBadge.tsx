import { useRef, useState, useEffect } from 'react';
import { BadgeWrapper, Badge, Dropdown, DropdownItem } from './styles';

const STATUS_CONFIG = {
  ACTIVE: { label: 'Ativo', bg: 'rgba(255,255,255,0.25)', dot: '#a8f0c6' },
  INACTIVE: { label: 'Inativo', bg: 'rgba(0,0,0,0.20)', dot: '#f0d0a8' },
  COMPLETED: { label: 'Concluído', bg: 'rgba(0,0,0,0.30)', dot: '#a8c8f0' },
} as const;

type Status = keyof typeof STATUS_CONFIG;

interface StatusBadgeProps {
  status: string;
  onChange: (status: Status) => void;
  disabled?: boolean;
}

export function StatusBadge({ status, onChange, disabled }: StatusBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = STATUS_CONFIG[status as Status] ?? STATUS_CONFIG.ACTIVE;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <BadgeWrapper ref={ref}>
      <Badge
        $bg={current.bg}
        $dot={current.dot}
        onClick={() => !disabled && setOpen(o => !o)}
        $clickable={!disabled}
      >
        <span className="dot" />
        {current.label}
        {!disabled && <span className="chevron">{open ? '▲' : '▼'}</span>}
      </Badge>

      {open && (
        <Dropdown>
          {(
            Object.entries(STATUS_CONFIG) as [
              Status,
              (typeof STATUS_CONFIG)[Status],
            ][]
          ).map(([key, config]) => (
            <DropdownItem
              key={key}
              $dot={config.dot}
              $active={key === status}
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
            >
              <span className="dot" />
              {config.label}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </BadgeWrapper>
  );
}
