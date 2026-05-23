import { useState } from 'react';
import AddButton from '../Buttons/Add/button';
import { SearchInput } from '../Inputs/SearchInput/input';
import { Content, Row, Title, Wrapper } from './styles';
import { MonthNavigator } from '../Buttons/MonthNavigator/button';
import { FilterButton } from '../Buttons/Filter/button';

interface HeaderProps {
  type: 'Calendário' | 'Clientes' | 'Invoice' | 'Relatórios';
  buttonText: string | null;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

export default function Header({
  type,
  buttonText,
  onNextMonth,
  onPrevMonth,
}: HeaderProps) {
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
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
              onClick={() => console.log('Adicionar Projeto')}
            />
          </>
        )}
        {type === 'Clientes' && (
          <>
            <SearchInput
              value={search}
              onChange={setSearch}
              onSearch={() => setSearch}
              placeholder="Pesquisar por cliente"
            />
            <AddButton
              label="Adicionar Cliente"
              onClick={() => {
                console.log('Adicinar Cliente');
              }}
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
                onClick={() => console.log('Gerar Relatório')}
              />
              <FilterButton onClick={() => setShowFilter(true)} />
            </Row>
          </>
        )}
        {type === 'Invoice' && (
          <>
            <div></div>
            <AddButton
              label={buttonText ?? ''}
              onClick={() => console.log('Gerar Invoice')}
            />
          </>
        )}
      </Content>
    </Wrapper>
  );
}
