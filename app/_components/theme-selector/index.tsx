// ThemeSelector.tsx
import { Button } from '@/components/ui/button';
import { useGlobalStyles } from '@/context/theme-provider';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useGlobalStyles();

  return (
    <div className="theme-selector">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800"
        onClick={toggleTheme}
      >
        <MoonIcon />
      </Button>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800"
        onClick={toggleTheme}
      >
        <SunIcon />
      </Button>
    </div>
  );
};

export default ThemeSelector;
