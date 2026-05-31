import { Grid } from '@/components/pages/Clientes/styles';
import {
  SkeletonActions,
  SkeletonCard,
  SkeletonLine,
} from './styles';

export function InvoicesSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i}>
          <SkeletonLine $width="65%" $height="18px" />
          <SkeletonLine $width="40%" $height="14px" />
          <SkeletonLine $width="30%" $height="13px" />
          <SkeletonActions>
            <SkeletonLine
              $width="18px"
              $height="18px"
              $radius="6px"
            />
            <SkeletonLine
              $width="18px"
              $height="18px"
              $radius="6px"
            />
          </SkeletonActions>
        </SkeletonCard>
      ))}
    </Grid>
  );
}
