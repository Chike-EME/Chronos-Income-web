import ResetPassword from '@/components/pages/auth/ResetPassword/page';
import { Suspense } from 'react';

export default function RedefinirSenhaPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <ResetPassword />
      </Suspense>
    </main>
  );
}
