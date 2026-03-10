import Providers from '@/components/Providers/Providers';
import type { Metadata } from 'next';
import { Lato, Poppins } from 'next/font/google';

// importação de fontes

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const lato = Lato({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

//

export const metadata: Metadata = {
  title: 'Chronos Income',
  description: 'Chronos Income',
  icons: {
    icon: '/favicon.svg',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt">
      <body className={`${poppins.variable} ${lato.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
