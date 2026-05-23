import { Wrapper } from './styles';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function AddButton({ label, onClick }: ButtonProps) {
  return (
    <Wrapper onClick={onClick}>
      <img
        src="/img/PlusIcon.svg"
        alt="Adicionar"
        width={24}
        height={24}
        style={{ marginRight: '2px' }}
      />

      <span>{label}</span>
    </Wrapper>
  );
}
