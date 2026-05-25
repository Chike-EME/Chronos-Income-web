import { useState } from 'react';
import AddButton from '../Buttons/Add/button';
import { SearchInput } from '../Inputs/SearchInput/input';
import { Content, Row, Title, Wrapper } from './styles';
import { MonthNavigator } from '../Buttons/MonthNavigator/button';
import { FilterButton } from '../Buttons/Filter/button';

interface HeaderProps {
  type: 'Calendário' | 'Clientes' | 'Invoice' | 'Relatórios';
  buttonText?: string | null;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  onAddClick?: () => void;
  onFilterClick?: () => void;
}

export default function Header({
  type,
  buttonText,
  onPrevMonth,
  onNextMonth,
  searchValue = '',
  onSearchChange,
  onSearch,
  onAddClick,
  onFilterClick,
}: HeaderProps) {
  return (
    <Wrapper>
      <Title>{type}</Title>
      <Content>
        {type === 'Calendário' && (
          <>
            <MonthNavigator
              label={buttonText ?? ''}
              onPrev={onPrevMonth ?? (() => {})}
              onNext={onNextMonth ?? (() => {})}
            />
            <AddButton
              label="Adicionar Projeto"
              onClick={() => onAddClick?.()}
            />
          </>
        )}

        {type === 'Clientes' && (
          <>
            <SearchInput
              value={searchValue}
              onChange={onSearchChange ?? (() => {})}
              onSearch={onSearch ?? (() => {})}
              placeholder="Pesquisar por cliente"
            />
            <AddButton
              label="Adicionar Cliente"
              onClick={() => onAddClick?.()}
            />
          </>
        )}

        {type === 'Relatórios' && (
          <>
            <MonthNavigator
              label={buttonText ?? ''}
              onPrev={onPrevMonth ?? (() => {})}
              onNext={onNextMonth ?? (() => {})}
            />
            <Row>
              <AddButton
                label="Gerar Relatório"
                onClick={() => onAddClick?.()}
              />
              <FilterButton onClick={() => onFilterClick?.()} />
            </Row>
          </>
        )}

        {type === 'Invoice' && (
          <>
            <div />
            <AddButton
              label={buttonText ?? ''}
              onClick={() => onAddClick?.()}
            />
          </>
        )}
      </Content>
    </Wrapper>
  );
}
