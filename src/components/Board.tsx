import React from 'react';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { Droppable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
interface AreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<AreaProps>`
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
`;
interface BoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}
function Board({ toDos, boardId }: BoardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDo = useSetRecoilState(toDoState);
  const onValid = (data: IForm) => {
    console.log(data);
    setValue('toDo', '');
    setToDo((prev) => ({
      ...prev,
      [boardId]: [...prev[boardId], { id: Date.now(), text: data.toDo }],
    }));
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
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
