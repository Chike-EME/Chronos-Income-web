import { ClientInfo, ProjectsRow } from '@/styles/global';
import { SkeletonCard, SkeletonLine } from '../styles';
import { SkeletonMetaRow } from './styles';

export function ClientDetailsSkeleton() {
  return (
    <ClientInfo>
      {/* Nome */}
      <SkeletonLine $width="55%" $height="20px" />

      {/* Descrição */}
      <SkeletonLine $width="100%" $height="16px" />
      <SkeletonLine $width="80%" $height="16px" />

      {/* CNPJ + Projetos */}
      <SkeletonMetaRow>
        <SkeletonLine $width="140px" $height="14px" />
        <SkeletonLine $width="80px" $height="14px" />
      </SkeletonMetaRow>

      {/* Cards de projeto */}
      <ProjectsRow>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i}>
            <SkeletonLine $width="70%" $height="16px" />
            <SkeletonLine $width="90%" $height="13px" />
            <SkeletonLine $width="90%" $height="13px" />
            <SkeletonLine $width="60%" $height="13px" />
            <SkeletonLine $width="50%" $height="13px" />
          </SkeletonCard>
        ))}
      </ProjectsRow>
    </ClientInfo>
  );
}
