'use client';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/zustand/editorStore';
import clsx from 'clsx';
import { EyeOff } from 'lucide-react';
import React, { useEffect } from 'react';
import Recursive from './editor-elements/recursive';

type Props = { liveMode?: boolean };

const Editor = ({ liveMode }: Props) => {
  const { toggleLiveMode, editor, changeClickedElement, setPreviewMode } =
    useEditorStore();

  useEffect(() => {
    if (liveMode) {
      toggleLiveMode(!editor.liveMode);
    }
  }, [liveMode]);

  const handleClick = () => {
    changeClickedElement(editor.selectedElement);
  };

  const handleUnpreview = () => {
    setPreviewMode(!editor.previewMode);
    toggleLiveMode(true);
  };
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
          className="fixed left-0 top-0 z-[100] h-6 w-6 bg-slate-600 p-[2px]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(editor.elements) &&
        editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default Editor;
