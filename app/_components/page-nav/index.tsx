// NavigationBar.tsx
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editorStore';

const PageNavigationBar = () => {
  const { pages, currentPageId, setCurrentPage, addPage } = useEditorStore();

  return (
    <div className="flex items-center space-x-4 p-4">
      {pages.map((page) => (
        <Button
          key={page.id}
          onClick={() => setCurrentPage(page.id)}
          className={`px-4 py-2 ${currentPageId === page.id ? 'bg-black text-white' : 'bg-gray-300'}`}
        >
          {page.name}
        </Button>
      ))}
      <Button onClick={() => addPage(`Page ${pages.length + 1}`)}>
        Add Page
      </Button>
    </div>
  );
};

export default PageNavigationBar;
