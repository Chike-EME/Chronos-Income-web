import { Wrapper } from './styles';

type ButtonProps = {
  onClick: () => void;
};

export function FilterButton({ onClick }: ButtonProps) {
  return (
    <Wrapper onClick={onClick}>
      <img
        src="/img/FilterIcon.svg"
        alt="Filtrar"
        width={24}
        height={24}
      />
    </Wrapper>
  );
}
