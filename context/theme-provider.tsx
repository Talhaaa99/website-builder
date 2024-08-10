'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface GlobalStylesContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const GlobalStylesContext = createContext<GlobalStylesContextProps | undefined>(
  undefined,
);

interface GlobalStylesProviderProps {
  children: ReactNode;
}

export const GlobalStylesProvider: React.FC<GlobalStylesProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <GlobalStylesContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </GlobalStylesContext.Provider>
  );
};

export const useGlobalStyles = () => {
  const context = useContext(GlobalStylesContext);
  if (!context) {
    throw new Error(
      'useGlobalStyles must be used within a GlobalStylesProvider',
    );
  }
  return context;
};
