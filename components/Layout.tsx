import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-800 to-transparent p-4 text-white">
        Website Builder
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
