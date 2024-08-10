import React, { useEffect } from 'react';
import { useEditorStore } from '@/zustand/editorStore';
import clsx from 'clsx';
import Container from './editor-elements/container';
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
    const currentPage = pages.find((page) => page.id === currentPageId);
    const currentEditor = currentPage?.elements[0]; // Assuming each page has one Editor instance

    const bodyExists = currentEditor?.elements.some(
      (el) => el.type === '__body',
    );

    if (!bodyExists && currentPage) {
      loadData(
        [
          {
            id: '__body',
            name: 'Body',
            type: '__body',
            styles: {},
            content: [],
          },
        ],
        currentPageId,
      );
    }

    if (liveMode) {
      toggleLiveMode(!editor.liveMode);
    }
  }, [
    liveMode,
    loadData,
    toggleLiveMode,
    editor.liveMode,
    pages,
    currentPageId,
  ]);

  const handleClick = () => {
    if (editor.selectedElement) {
      changeClickedElement(editor.selectedElement);
    }
  };

  const handleUnpreview = () => {
    setPreviewMode(!editor.previewMode);
    toggleLiveMode(!editor.liveMode);
  };

  const currentPage = pages.find((page) => page.id === currentPageId);
  const currentEditor = currentPage?.elements[0]; // Access the first (and only) editor in the page

  if (!currentPage || !currentEditor) {
    return <div>No page or editor available.</div>;
  }

  return (
    <div
      className={clsx(
        'use-automation-zoom-in mr-[450px] h-full items-center overflow-scroll rounded-md bg-background transition-all',
        {
          '!mr-0 !p-0': editor.previewMode === true || editor.liveMode === true,
          '!w-[850px]': editor.device === 'Tablet',
          '!w-[420px]': editor.device === 'Mobile',
          'w-auto': editor.device === 'Desktop',
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
      {currentEditor.elements.map((element) => (
        <Container key={element.id} element={element} />
      ))}
    </div>
  );
};

export default Editor;
