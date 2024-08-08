'use client';

import React from 'react';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEditorStore, EditorElement } from '@/zustand/editorStore';

type Props = {
  element: EditorElement;
};

const TextComponent = ({ element }: Props) => {
  const { editor, changeClickedElement, deleteElement, updateElement } =
    useEditorStore();

  const handleDeleteElement = () => {
    deleteElement(element.id);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(element);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const spanElement = e.target as HTMLSpanElement;
    updateElement({
      ...element,
      content: {
        innerText: spanElement.innerText,
      },
    });
  };

  return (
    <div
      style={element.styles}
      className={clsx(
        'relative m-[5px] w-full p-[2px] text-[16px] transition-all',
        {
          '!border-blue-500': editor.selectedElement.id === element.id,
          '!border-solid': editor.selectedElement.id === element.id,
          'border-[1px] border-dashed border-slate-300': !editor.liveMode,
        },
      )}
      onClick={handleOnClickBody}
    >
      {editor.selectedElement.id === element.id && !editor.liveMode && (
        <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
          {editor.selectedElement.name}
        </Badge>
      )}
      <span contentEditable={!editor.liveMode} onBlur={handleBlur}>
        {!Array.isArray(element.content) && element.content.innerText}
      </span>
      {editor.selectedElement.id === element.id && !editor.liveMode && (
        <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-xs font-bold !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
};

export default TextComponent;
