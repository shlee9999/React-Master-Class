import { Droppable } from '@hello-pangea/dnd';
import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
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
`;
const Area = styled.div`
  background-color: tomato;
  flex-grow: 1;
  padding: 10px;
`;
function Trash() {
  return (
    <Wrapper>
      Trash
      <Droppable droppableId='trash'>
        {(magic, snapshot) => (
          <Area ref={magic.innerRef} {...magic.droppableProps}>
            쓰레기통
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Trash;
