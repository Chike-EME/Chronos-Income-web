import { ReportData } from '@/components/types/reports/types';

export const mockReport: ReportData = {
  totalMonth: 50000,
  totalEmitted: 48000,
  totalNotEmitted: 2000,
  emitted: [
    { name: 'Ágatha Jamille', value: 31200, color: '#2E86DE' },
    { name: 'Carla Franco', value: 12000, color: '#E07ABF' },
    { name: 'João Gabriel', value: 4800, color: '#F39C12' },
  ],
  notEmitted: [
    { name: 'Ágatha Jamille', value: 1000, color: '#2E86DE' },
    { name: 'Carla Franco', value: 500, color: '#E07ABF' },
    { name: 'João Gabriel', value: 500, color: '#F39C12' },
  ],
};
