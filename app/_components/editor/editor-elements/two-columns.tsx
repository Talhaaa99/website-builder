'use client';
import React from 'react';
import { v4 } from 'uuid';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';
import RecursiveElement from './recursive';
import { EditorBtns, defaultStyles } from '@/lib/constants';
import { useEditorStore, EditorElement } from '@/zustand/editorStore'; // Adjust the import path as necessary

type Props = {
  element: EditorElement;
};

const TwoColumns = ({ element }: Props) => {
  const { id, content, type } = element;
  const { editor, changeClickedElement, addElement } = useEditorStore();

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns;

    let newElement: EditorElement;

    switch (componentType) {
      case 'text':
        newElement = {
          id: v4(),
          name: 'Text',
          type: 'text',
          content: { innerText: 'Text Component' },
          styles: {
            color: 'black',
            ...defaultStyles,
          },
        };
        break;
      case 'container':
        newElement = {
          id: v4(),
          name: 'Container',
          type: 'container',
          content: [],
          styles: { ...defaultStyles },
        };
        break;
      case '2Col':
        newElement = {
          id: v4(),
          name: 'Two Columns',
          type: '2Col',
          content: [],
          styles: { ...defaultStyles },
        };
        break;
      default:
        return;
    }

    addElement(newElement, id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    if (elementType === '__body') return;
    e.dataTransfer.setData('componentType', elementType);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(element);
  };

  return (
    <div
      style={element.styles}
      className={clsx('relative p-4 transition-all', {
        'h-fit': type === 'container',
        'h-full': type === '__body',
        'm-4': type === 'container',
        '!border-blue-500':
          editor.selectedElement.id === element.id && !editor.liveMode,
        '!border-solid':
          editor.selectedElement.id === element.id && !editor.liveMode,
        'border-[1px] border-dashed border-slate-300': !editor.liveMode,
      })}
      id="innerContainer"
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      draggable={type !== '__body'}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, 'container')}
    >
      {editor.selectedElement.id === element.id && !editor.liveMode && (
        <Badge className="absolute -left-[1px] -top-[23px] rounded-none rounded-t-lg">
          {editor.selectedElement.name}
        </Badge>
      )}
      {Array.isArray(content) &&
        content.map((childElement) => (
          <RecursiveElement key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default TwoColumns;
