// NavigationBar.tsx
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/zustand/editorStore';
import { PlusIcon, Trash2Icon } from 'lucide-react';

const PageNavigationBar = () => {
  const { pages, currentPageId, setCurrentPage, addPage, removePage } =
    useEditorStore();

  return (
    <div className="flex items-start space-x-4">
      {pages.map((page) => (
        <div key={page.id} className="flex items-center space-x-2">
          <div className="flex flex-col items-center self-start">
            <Button
              onClick={() => setCurrentPage(page.id)}
              className={`px-4 py-2 ${currentPageId === page.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-300'}`}
            >
              {page.name}
            </Button>
            <Trash2Icon
              size={35}
              onClick={() => removePage(page.id)}
              className="mt-2 rounded-xl px-2 py-2 text-red-500 hover:bg-red-100"
            />
          </div>
        </div>
      ))}
      <PlusIcon
        className="mt-1 rounded-xl px-2 py-2 hover:bg-slate-200 dark:text-white"
        size={35}
        onClick={() => addPage(`Page ${pages.length + 1}`)}
      />
    </div>
  );
};

export default PageNavigationBar;
