import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface DraggableTextProps {
  id: string;
  index: number;
  text: string;
}

const DraggableText: React.FC<DraggableTextProps> = ({ id, index, text }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 rounded border bg-white p-2"
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableText;
