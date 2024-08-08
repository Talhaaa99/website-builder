'use client';

import React from 'react';
import clsx from 'clsx';
import { v4 } from 'uuid';
import { Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Recursive from './recursive';
import { EditorBtns, defaultStyles } from '@/lib/constants';
import { useEditorStore, EditorElement } from '@/zustand/editorStore';

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;
  const { editor, addElement, changeClickedElement, deleteElement } =
    useEditorStore();

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns;

    const newElement: EditorElement = {
      id: v4(),
      name: '',
      styles: {},
      type: 'container',
      content: {},
    };

    switch (componentType) {
      case 'text':
        newElement.name = 'Text';
        newElement.styles = { color: 'black', ...defaultStyles };
        newElement.type = 'text';
        newElement.content = { innerText: 'Text Element' };
        break;
      case 'link':
        newElement.name = 'Link';
        newElement.styles = { color: 'black', ...defaultStyles };
        newElement.type = 'link';
        newElement.content = { innerText: 'Link Element', href: '#' };
        break;
      case 'video':
        newElement.name = 'Video';
        newElement.styles = {};
        newElement.type = 'video';
        newElement.content = {
          src: 'https://www.youtube.com/embed/A3l6YYkXzzg?si=zbcCeWcpq7Cwf8W1',
        };
        break;
      case 'container':
        newElement.name = 'Container';
        newElement.styles = { ...defaultStyles };
        newElement.type = 'container';
        newElement.content = [];
        break;
      case 'contactForm':
        newElement.name = 'Contact Form';
        newElement.styles = {};
        newElement.type = 'contactForm';
        newElement.content = [];
        break;
      case 'paymentForm':
        newElement.name = 'Payment Form';
        newElement.styles = {};
        newElement.type = 'paymentForm';
        newElement.content = [];
        break;
      case '2Col':
        newElement.name = 'Two Columns';
        newElement.styles = { ...defaultStyles, display: 'flex' };
        newElement.type = '2Col';
        newElement.content = [
          {
            id: v4(),
            name: 'Container',
            styles: { ...defaultStyles, width: '100%' },
            type: 'container',
            content: [],
          },
          {
            id: v4(),
            name: 'Container',
            styles: { ...defaultStyles, width: '100%' },
            type: 'container',
            content: [],
          },
        ];
        break;
    }

    addElement(newElement, id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (type === '__body') return;
    e.dataTransfer.setData('componentType', 'container');
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(element);
  };

  const handleDeleteElement = () => {
    deleteElement(id);
  };

  return (
    <div
      style={styles}
      className={clsx('group relative p-4 transition-all', {
        'w-full max-w-full': type === 'container' || type === '2Col',
        'h-fit': type === 'container',
        'h-full overflow-scroll': type === '__body',
        'flex flex-col md:!flex-row': type === '2Col',
        '!border-blue-500':
          editor.selectedElement.id === id &&
          !editor.liveMode &&
          editor.selectedElement.type !== '__body',
        '!border-4 !border-yellow-400':
          editor.selectedElement.id === id &&
          !editor.liveMode &&
          editor.selectedElement.type === '__body',
        '!border-solid': editor.selectedElement.id === id && !editor.liveMode,
        'border-[1px] border-dashed border-slate-300': !editor.liveMode,
      })}
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      draggable={type !== '__body'}
      onClick={handleOnClickBody}
      onDragStart={handleDragStart}
    >
      <Badge
        className={clsx(
          'absolute -left-[1px] -top-[23px] hidden rounded-none rounded-t-lg',
          {
            block: editor.selectedElement.id === id && !editor.liveMode,
          },
        )}
      >
        {element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {editor.selectedElement.id === id &&
        !editor.liveMode &&
        editor.selectedElement.type !== '__body' && (
          <div className="absolute -right-[1px] -top-[25px] rounded-none rounded-t-lg bg-primary px-2.5 py-1 text-xs font-bold">
            <Trash size={16} onClick={handleDeleteElement} />
          </div>
        )}
    </div>
  );
};

export default Container;
