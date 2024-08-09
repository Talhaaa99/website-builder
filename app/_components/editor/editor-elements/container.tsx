'use client';

import React from 'react';
import clsx from 'clsx';
import { v4 } from 'uuid';
import { Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Recursive from './recursive';
import { EditorBtns, defaultStyles } from '@/lib/constants';
import { useEditorStore, EditorElement } from '@/store/editorStore';

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
        newElement.content = { src: 'video-url.mp4' };
        break;
      default:
        return; // Exit if no valid component type is found
    }

    // Log before updating state
    console.log('Before drop: ', content);

    const updatedContent = Array.isArray(content)
      ? [...content, newElement]
      : [newElement];
    const updatedElement = { ...element, content: updatedContent };

    // Log after creating the new element
    console.log('New element: ', newElement);
    console.log('Updated content: ', updatedContent);

    // Update state with the new content
    addElement(updatedElement, id);

    // Log after updating state
    console.log('After drop, updated element: ', updatedElement);

    // Optionally trigger any state updates or re-renders
    changeClickedElement(newElement);
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
    console.log('Deleted element id ', id);

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
