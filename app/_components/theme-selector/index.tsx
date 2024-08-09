// ThemeSelector.tsx
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editorStore';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeSelector = () => {
  const { setTheme } = useEditorStore();

  return (
    <div className="theme-selector">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:bg-slate-200"
        onClick={() => setTheme('light')}
      >
        <MoonIcon />
      </Button>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:bg-slate-200"
        onClick={() => setTheme('dark')}
      >
        <SunIcon />
      </Button>
    </div>
  );
};

export default ThemeSelector;
