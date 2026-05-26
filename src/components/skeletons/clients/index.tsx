import { Grid } from '@/components/pages/Clientes/styles';
import {
  SkeletonCard,
  SkeletonCardHeader,
  SkeletonLine,
  SkeletonMeta,
} from './styles';

const SKELETON_COUNT = 6;

export function ClientsSkeleton() {
  return (
    <Grid>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <SkeletonCard key={i}>
          <SkeletonCardHeader>
            <SkeletonLine $width="55%" $height="22px" />
            <SkeletonMeta>
              <SkeletonLine
                $width="20px"
                $height="20px"
                $radius="50%"
              />
              <SkeletonLine
                $width="20px"
                $height="20px"
                $radius="50%"
              />
            </SkeletonMeta>
          </SkeletonCardHeader>

          <SkeletonLine $width="70%" $height="14px" />

          <SkeletonLine $width="100%" $height="14px" />
          <SkeletonLine $width="85%" $height="14px" />
        </SkeletonCard>
      ))}
    </Grid>
  );
}
