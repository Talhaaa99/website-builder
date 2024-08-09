import { EditorElement } from '@/zustand/editorStore';
import React from 'react';
import TextComponent from './text';
import Container from './container';
import VideoComponent from './video';
import LinkComponent from './link-component';

type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  // Log to verify what's being rendered
  console.log(
    'Rendering element in Recursive with type: ',
    element.type,
    'and content:',
    element.content,
  );

  if (element.type === '__body') {
    console.log('Rendering __body element:', element);
  }

  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />;
    case 'container':
      return <Container element={element} />;
    case 'video':
      return <VideoComponent element={element} />;
    case '__body':
      return <Container element={element} />;
    case 'link':
      return <LinkComponent element={element} />;
    default:
      return null;
  }
};

export default Recursive;
