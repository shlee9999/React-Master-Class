import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';

import Board from './components/Board';
import Trash from './components/Trash';
import TitleModal from './components/TitleModal';
import { useState } from 'react';

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
const Title = styled.div`
  font-size: 50px;
  color: ${(props) => props.theme.boardColor};
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
`;
const AddButton = styled.button`
  position: absolute;
  right: 30px;
  top: 30px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.boardColor};
  font-size: 20px;
  font-weight: 900;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return; //같은 위치에 놓는 경우
    if (destination.droppableId === 'trash') {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });

      return;
    }
    if (source.droppableId === destination.droppableId) {
      // same board
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else {
      // cross board
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const destBoardCopy = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        sourceBoardCopy.splice(source.index, 1);
        destBoardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destBoardCopy,
        };
      });
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddButton onClick={openModal}>+</AddButton>
        <Title>Canvan Board</Title>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
      <Trash />
      {isModalOpen && <TitleModal closeModal={closeModal} />}
    </DragDropContext>
  );
}

export default App;
