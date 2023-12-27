import { Droppable } from '@hello-pangea/dnd';
import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div<AreaProps>`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 100px;
  background-color: aliceblue;
  padding: 20px;
  border-radius: 15px;
  position: absolute;
  bottom: 50px;
  right: 50px;
  filter: brightness(${(props) => (props.isDraggingOver ? 0.5 : 1)});
  transition: filter 0.2s ease-in;
`;

interface AreaProps {
  isDraggingOver: boolean;
}
function Trash() {
  return (
    <Droppable droppableId='trash'>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          Trash
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Trash;
