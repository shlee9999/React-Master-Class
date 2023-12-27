import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: green;
  box-shadow: 2px 2px 15px;
`;
const TitleForm = styled.form``;
const TitleInput = styled.input``;
interface IForm {
  title: string;
}
function TitleModal() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    setToDos((allBoards) => ({ ...allBoards, [data.title]: [] }));
  };

  return (
    <Wrapper>
      <TitleForm onSubmit={handleSubmit(onValid)}>
        <TitleInput {...register('title')} />
      </TitleForm>
    </Wrapper>
  );
}

export default TitleModal;
