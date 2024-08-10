'use client';
import { Badge } from '@/components/ui/badge';
import { EditorBtns } from '@/lib/constants';
import { useEditorStore, EditorElement } from '@/zustand/editorStore';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React from 'react';

type Props = {
  element: EditorElement;
};

const VideoComponent = (props: Props) => {
  const { editor, changeClickedElement, deleteElement } = useEditorStore();
  const styles = props.element.styles;

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(props.element);
  };

  const handleDeleteElement = () => {
    deleteElement(props.element?.id);
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'video')}
      onClick={handleOnClick}
      className={clsx(
        'relative m-[5px] flex w-full items-center justify-center p-[2px] text-[16px] transition-all',
        {
          '!border-blue-500': editor?.selectedElement?.id === props.element.id,
          '!border-solid': editor?.selectedElement?.id === props.element.id,
          'border-[1px] border-dashed border-slate-300': !editor.liveMode,
        },
      )}
    >
      {editor?.selectedElement?.id === props.element.id && !editor.liveMode && (
        <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
          {editor.selectedElement.name}
        </Badge>
      )}

      {!Array.isArray(props.element.content) && (
        <iframe
          width={props.element.styles.width || '560'}
          height={props.element.styles.height || '315'}
          src={props.element.content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}

      {editor?.selectedElement?.id === props.element.id && !editor.liveMode && (
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

export default VideoComponent;
