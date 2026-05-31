'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import {
  ChartCard,
  ChartTitle,
  ChartTotal,
  SkeletonChart,
  SkeletonLegend,
  SkeletonLine,
} from './styles';
import { ChartDataItem } from '@/components/types/reports/types';

interface ClientPieChartProps {
  title: string;
  total: number;
  data: ChartDataItem[];
  loading?: boolean;
}

function renderCustomLabel(props: any) {
  const { cx, cy, midAngle, outerRadius, name, value, fill } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 36;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';

  return (
    <g>
      <line
        x1={cx + (outerRadius + 6) * Math.cos(-midAngle * RADIAN)}
        y1={cy + (outerRadius + 6) * Math.sin(-midAngle * RADIAN)}
        x2={x}
        y2={y}
        stroke={fill}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y - 5}
        fill="#7A7A7A"
        textAnchor={textAnchor}
        fontSize={12}
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 13}
        fill={fill}
        textAnchor={textAnchor}
        fontSize={15}
        fontWeight="700"
      >
        ${value.toLocaleString('pt-BR')}
      </text>
    </g>
  );
}

function renderLegend(props: any) {
  const { payload } = props;
  return (
    <ul
      style={{
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {payload.map((entry: any) => (
        <li
          key={entry.value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: '#555',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: entry.color,
              display: 'inline-block',
            }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
}

export function ClientPieChart({
  title,
  total,
  data,
  loading,
}: ClientPieChartProps) {
  return (
    <ChartCard>
      <ChartTitle>{title}</ChartTitle>
      <ChartTotal>Total: ${total.toLocaleString('pt-BR')}</ChartTotal>

      {loading ? (
        <>
          <SkeletonChart />
          <SkeletonLegend>
            <SkeletonLine $width="80px" />
            <SkeletonLine $width="80px" />
            <SkeletonLine $width="80px" />
          </SkeletonLegend>
        </>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ top: 10, right: 60, bottom: 10, left: 60 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={renderCustomLabel}
              labelLine={false}
            >
              {data.map(item => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
