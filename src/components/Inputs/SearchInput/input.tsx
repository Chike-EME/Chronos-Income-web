import { useCallback, useEffect, useRef } from 'react';
import { Container, Input, SearchButton } from './styles';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  debouncedDelay?: number;
  placeholder?: string;
  disabled?: boolean;
};

export function SearchInput({
  value,
  onChange,
  onSearch,
  debouncedDelay = 500,
  placeholder = 'Pesquisar',
  disabled,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const searchNow = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch();
  }, [onSearch]);

  useEffect(() => {
    if (!value) return;

    debounceRef.current = setTimeout(() => {
      onSearch();
    }, debouncedDelay);

    return () => {
      if (debounceRef.current) clearTimeout;
    };
  }, [value, debouncedDelay]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchNow();
      inputRef.current?.blur();
    }
  }

  return (
    <Container>
      <Input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      <SearchButton onClick={searchNow} disabled={disabled}>
        <img
          src="/img/SearchIcon.svg"
          alt="Buscar"
          width={24}
          height={24}
        />
      </SearchButton>
    </Container>
  );
}
