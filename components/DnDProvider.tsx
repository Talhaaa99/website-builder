'use client';

import { ReactNode } from 'react';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';

interface DnDProviderProps {
  children: ReactNode;
  onDragEnd: DragDropContextProps['onDragEnd'];
}

export const DnDProvider = ({ children, onDragEnd }: DnDProviderProps) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
