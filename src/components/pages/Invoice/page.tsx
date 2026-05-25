'use client';

import Header from '@/components/Header';
import { Wrapper } from './styles';

export default function Invoice() {
  return (
    <Wrapper>
      <Header type="Invoice" buttonText="teste" />
      Em produção
    </Wrapper>
  );
}
