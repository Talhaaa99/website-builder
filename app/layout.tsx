// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalStylesProvider } from '@/context/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Website Builder',
  description: 'Built using shadcn, react-beautiful-dnd and some love',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStylesProvider>{children}</GlobalStylesProvider>
      </body>
    </html>
  );
}
