import { ArrowButton, ButtonContainer } from './styles';

type MonthNavigatorProps = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
};

export function MonthNavigator({
  label,
  onPrev,
  onNext,
}: MonthNavigatorProps) {
  return (
    <ButtonContainer>
      <ArrowButton
        src="/img/LeftArrow.svg"
        alt="voltar"
        width={24}
        height={24}
        onClick={onPrev}
      />
      <span>{label}</span>
      <ArrowButton
        src="/img/RightArrow.svg"
        alt="avançar"
        width={24}
        height={24}
        onClick={onNext}
      />
    </ButtonContainer>
  );
}
