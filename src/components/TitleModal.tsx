import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

const Wrapper = styled.div`
  padding: 70px 0;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: ${(props) => props.theme.bgColor};
  filter: brightness(1.5);
  box-shadow: 2px 2px 15px;
  border-radius: 15px;
  overflow: hidden;
`;
const Title = styled.span`
  color: ${(props) => props.theme.boardColor};
`;
const TitleForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const TitleInput = styled.input`
  width: 70%;
  height: 30px;
  padding: 5px 8px;
  font-size: 15px;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.boardColor};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.2;
  }
`;
interface IForm {
  title: string;
}

function TitleModal({ closeModal }: { closeModal: () => void }) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setToDos((allBoards) => ({ ...allBoards, [data.title]: [] }));
    setValue('title', '');
    closeModal();
  };
  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <Wrapper>
      <TitleForm onSubmit={handleSubmit(onValid)}>
        <Title>Create Board!</Title>
        <TitleInput
          {...register('title')}
          placeholder='보드 이름을 입력하세요.'
        />
      </TitleForm>
      <CloseButton onClick={closeModal}>X</CloseButton>
    </Wrapper>
  );
}

export default TitleModal;
