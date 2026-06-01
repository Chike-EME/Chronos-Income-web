import { useRef, useState, useEffect } from 'react';
import { BadgeWrapper, Badge, Dropdown, DropdownItem } from './styles';
import { InvoiceStatus } from '@/components/types/invoices/types';

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; dot: string }
> = {
  PENDING: { label: 'Pendente', bg: 'rgba(232,144,10,0.15)', dot: '#E8900A' },
  PAID: { label: 'Pago', bg: 'rgba(76,175,80,0.15)', dot: '#4CAF50' },
  CANCELLED: { label: 'Cancelado', bg: 'rgba(232,69,69,0.15)', dot: '#E84545' },
};

function getAllowedStatuses(current: string): InvoiceStatus[] {
  if (current === 'CANCELLED') return [];
  if (current === 'PAID') return ['CANCELLED'];
  return ['PAID', 'CANCELLED'];
}

interface InvoiceStatusBadgeProps {
  status: string;
  onChange: (status: InvoiceStatus) => void;
}

export function InvoiceStatusBadge({
  status,
  onChange,
}: InvoiceStatusBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = STATUS_CONFIG[status] ?? STATUS_CONFIG['PENDING'];
  const allowed = getAllowedStatuses(status);
  const canChange = allowed.length > 0;

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
        $clickable={canChange}
        onClick={() => canChange && setOpen(o => !o)}
      >
        <span className="dot" />
        {current.label}
        {canChange && <span className="chevron">{open ? '▲' : '▼'}</span>}
      </Badge>

      {open && (
        <Dropdown>
          {allowed.map(key => (
            <DropdownItem
              key={key}
              $dot={STATUS_CONFIG[key].dot}
              $active={key === status}
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
            >
              <span className="dot" />
              {STATUS_CONFIG[key].label}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </BadgeWrapper>
  );
}
