'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Wrapper, ScrollArea, SummaryRow, ChartsRow } from './styles';
import { SummaryCard } from '@/components/Cards/Summary';
import { useReports } from '@/components/services/reports/useReports';
import { ClientPieChart } from '@/components/Charts/PieChart';
import { ReportFilterModal } from '@/components/Modals/ReportFilter';
import { ReportFilter } from '@/components/types/reports/types';

export default function Relatorios() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Partial<ReportFilter>>({});

  const buttonText = currentDate.toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const { data, isLoading } = useReports(currentDate, activeFilter);

  return (
    <Wrapper>
      <Header
        type="Relatórios"
        buttonText={buttonText}
        onPrevMonth={() =>
          setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1))
        }
        onNextMonth={() =>
          setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1))
        }
        onAddClick={() => console.log('Gerar Relatório')}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      <ScrollArea>
        <SummaryRow>
          <SummaryCard
            icon="/img/Calendario.svg"
            label="Total do mês"
            value={data?.totalMonth ?? 0}
            loading={isLoading}
          />
          <SummaryCard
            icon="/img/EmitidoIcon.svg"
            label="Valores Pagos"
            value={data?.totalEmitted ?? 0}
            loading={isLoading}
          />
          <SummaryCard
            icon="/img/AlertIcon.svg"
            label="Valores Pendentes"
            value={data?.totalNotEmitted ?? 0}
            loading={isLoading}
          />
        </SummaryRow>

        <ChartsRow>
          <ClientPieChart
            title="Valores Pagos"
            total={data?.totalEmitted ?? 0}
            data={data?.emitted ?? []}
            loading={isLoading}
          />
          <ClientPieChart
            title="Valores Pendentes"
            total={data?.totalNotEmitted ?? 0}
            data={data?.notEmitted ?? []}
            loading={isLoading}
          />
        </ChartsRow>
      </ScrollArea>

      <ReportFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={filter => setActiveFilter(filter)}
      />
    </Wrapper>
  );
}
