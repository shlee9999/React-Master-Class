import { Droppable } from '@hello-pangea/dnd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
const Wrapper = styled.div<AreaProps>`
  display: flex;
  width: 150px;
  height: 100px;
  background-color: aliceblue;
  padding: 20px;
  border-radius: 15px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  filter: brightness(${(props) => (props.isDraggingOver ? 0.5 : 1)});
  &:hover {
    filter: brightness(0.8);
  }
  &:active {
    filter: brightness(0.5);
  }
  transition: filter 0.2s ease-in;
  justify-content: center;
  align-items: center;
`;

interface AreaProps {
  isDraggingOver: boolean;
}
function Trash() {
  const setToDo = useSetRecoilState(toDoState);
  const onClickTrash = () => {
    setToDo({});
  };
  return (
    <Droppable droppableId='trash'>
      {(magic, snapshot) => (
        <Wrapper
          onClick={onClickTrash}
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
