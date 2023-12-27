import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import styled from 'styled-components';
interface CardProps {
  isDragging: boolean;
}
const Card = styled.div<CardProps>`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.isDragging ? '#74b9ff' : '')};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 15px rgba(0,0,0,0.05)' : 'none'};
`;
interface DraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: DraggableCardProps) {
  console.log(toDoText + 'has been rendered');
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {/* key와 draggableId가 항상 같아야 한다. */}
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
