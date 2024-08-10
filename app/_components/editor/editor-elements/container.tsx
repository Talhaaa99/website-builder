'use client';

import React from 'react';
import clsx from 'clsx';
import { v4 } from 'uuid';
import { EditorBtns, defaultStyles } from '@/lib/constants';
import { useEditorStore, EditorElement } from '@/zustand/editorStore';
import TextComponent from './text';
import VideoComponent from './video';
import LinkComponent from './link-component';

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, styles, type } = element;
  const { addElement, changeClickedElement } = useEditorStore();

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const componentType = e.dataTransfer.getData('componentType') as EditorBtns;

    const newElement: EditorElement = {
      id: v4(),
      name: '',
      styles: {},
      type: 'container',
      content: [],
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
        return;
    }

    // Add the new element to the existing content array
    addElement(newElement, id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(element);
  };

  return (
    <div
      style={styles}
      className={clsx('group relative p-4 transition-all', {
        'w-full max-w-full': type === 'container' || type === '2Col',
        'h-fit': type === 'container',
        'h-full overflow-scroll': type === '__body',
        'flex flex-col md:!flex-row': type === '2Col',
      })}
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      onClick={handleOnClickBody}
    >
      {Array.isArray(content) &&
        content.map((childElement) => {
          switch (childElement.type) {
            case 'text':
              return (
                <TextComponent key={childElement.id} element={childElement} />
              );
            case 'container':
              return <Container key={childElement.id} element={childElement} />;
            case 'video':
              return (
                <VideoComponent key={childElement.id} element={childElement} />
              );
            case 'link':
              return (
                <LinkComponent key={childElement.id} element={childElement} />
              );
            default:
              return null;
          }
        })}
    </div>
  );
};

export default Container;
