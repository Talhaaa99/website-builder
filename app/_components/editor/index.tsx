import React, { useEffect } from 'react';
import { useEditorStore } from '@/store/editorStore';
import clsx from 'clsx';
import Recursive from './editor-elements/recursive';
import { Button } from '@/components/ui/button';
import { EyeOffIcon } from 'lucide-react';

const Editor = ({ liveMode }: { liveMode?: boolean }) => {
  const {
    toggleLiveMode,
    editor,
    changeClickedElement,
    setPreviewMode,
    pages,
    currentPageId,
    loadData,
  } = useEditorStore();

  useEffect(() => {
    const initialElements = [
      {
        id: 'element-1',
        name: 'Main Element',
        type: '__body',
        styles: {},
        content: [],
      },
    ];

    // Ensure the first page has elements on load
    loadData(initialElements);

    if (liveMode) {
      toggleLiveMode(!editor.liveMode);
    }
  }, [liveMode, loadData, toggleLiveMode, editor.liveMode]);

  const handleClick = () => {
    changeClickedElement(editor.selectedElement);
  };

  const handleUnpreview = () => {
    setPreviewMode(!editor.previewMode);
    toggleLiveMode(!editor.liveMode);
  };

  const currentPage = pages.find((page) => page.id === currentPageId);

  if (!currentPage) {
    return <div>No page available.</div>;
  }
  console.log('Elements in current page:', currentPage.elements);

  return (
    <div
      className={clsx(
        'use-automation-zoom-in mr-[385px] h-full overflow-scroll rounded-md bg-background transition-all',
        {
          '!mr-0 !p-0': editor.previewMode === true || editor.liveMode === true,
          '!w-[850px]': editor.device === 'Tablet',
          '!w-[420px]': editor.device === 'Mobile',
          'w-full': editor.device === 'Desktop',
        },
      )}
      onClick={handleClick}
    >
      {editor.previewMode && editor.liveMode && (
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={handleUnpreview}
          className="dark:text-white"
        >
          <EyeOffIcon />
        </Button>
      )}
      {currentPage.elements.map((element) => (
        <Recursive key={element.id} element={element} />
      ))}
    </div>
  );
};

export default Editor;
