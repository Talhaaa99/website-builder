'use client';

import { Droppable } from 'react-beautiful-dnd';
import DraggableText from './DraggableText';

interface DropZoneProps {
  id: string;
  items: { id: string; text: string }[];
}

const DropZone = ({ id, items }: DropZoneProps) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`border-2 border-dashed p-4 ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white'}`}
        >
          {items.map((item, index) => (
            <DraggableText
              key={item.id}
              id={item.id}
              index={index}
              text={item.text}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropZone;
