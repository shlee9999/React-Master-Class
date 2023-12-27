import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { Droppable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

const Wrapper = styled.div`
  position: relative;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  overflow: hidden;
`;
interface TitleProps {
  isEditing: boolean;
}
const Title = styled.div<TitleProps>`
  cursor: ${(props) => (props.isEditing ? 'default' : 'pointer')};
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
  border: none;
`;
interface AreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<AreaProps>`
  margin-top: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
`;
const Input = styled.input`
  display: block;
  margin: 0 auto;
  width: 70%;
  border: none;
  border-radius: 5px;
  padding: 5px 8px;
`;
const CloseButton = styled.button`
  position: absolute;
  background-color: transparent;
  right: 5px;
  top: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.2;
  }
`;
interface BoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}
interface ITitleForm {
  title: string;
}
function Board({ toDos, boardId }: BoardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const { register: titleRegister, handleSubmit: titleSubmit } =
    useForm<ITitleForm>();
  const setToDo = useSetRecoilState(toDoState);
  const onValid = (data: IForm) => {
    console.log(data);
    setValue('toDo', '');
    setToDo((prev) => ({
      ...prev,
      [boardId]: [...prev[boardId], { id: Date.now(), text: data.toDo }],
    }));
  };
  const onClickClose = () => {
    setToDo((allBoards) => {
      const copyAllBoards = { ...allBoards };
      delete copyAllBoards[boardId];
      return copyAllBoards;
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const onClickTitle = () => {
    setIsEditing(true);
  };
  const onTitleValid = (data: ITitleForm) => {
    setToDo((allBoards) => {
      const copyBoards = { ...allBoards };
      const newBoards = Object.keys(copyBoards).map((key) =>
        key === boardId
          ? { [data.title]: copyBoards[key] }
          : { [key]: copyBoards[key] }
      );
      let a = {};
      newBoards.map((board) => {
        a = { ...a, ...board };
      });
      return a;
    });
  };
  return (
    <Wrapper>
      <Form onSubmit={titleSubmit(onTitleValid)}>
        {isEditing ? (
          <Title as='input' isEditing={true} {...titleRegister('title')} />
        ) : (
          <Title onClick={onClickTitle} isEditing={false}>
            {boardId}
          </Title>
        )}
      </Form>
      <CloseButton onClick={onClickClose}>X</CloseButton>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register('toDo', { required: true })}
          type='text'
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                index={index}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
            {/* Board 크기가 변하지 않게 막아줌 */}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
