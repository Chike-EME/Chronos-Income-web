import {
  Card,
  IconWrapper,
  CardLabel,
  CardValue,
  SkeletonLine,
} from './styles';

interface SummaryCardProps {
  icon: string;
  label: string;
  value: number;
  loading?: boolean;
}

export function SummaryCard({
  icon,
  label,
  value,
  loading,
}: SummaryCardProps) {
  return (
    <Card>
      <IconWrapper>
        <img src={icon} alt={label} width={47} height={47} />
      </IconWrapper>
      <CardLabel>{label}</CardLabel>
      {loading ? (
        <SkeletonLine />
      ) : (
        <CardValue>
          ${' '}
          {value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
        </CardValue>
      )}
    </Card>
  );
}
