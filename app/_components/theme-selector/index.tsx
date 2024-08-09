// ThemeSelector.tsx
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/zustand/editorStore';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeSelector = () => {
  const { setTheme } = useEditorStore();

  return (
    <div className="theme-selector">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800"
        onClick={() => setTheme('dark')}
      >
        <MoonIcon />
      </Button>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800"
        onClick={() => setTheme('light')}
      >
        <SunIcon />
      </Button>
    </div>
  );
};

export default ThemeSelector;
