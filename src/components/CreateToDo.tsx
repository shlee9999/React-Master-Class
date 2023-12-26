import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atom';

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = (data: IForm) => {
    setValue('toDo', '');
    setToDos((oldToDos) => [
      ...oldToDos,
      { text: data.toDo, category, id: Date.now() },
    ]);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register('toDo', { required: 'Please write a To Do' })} />
      <button>Add</button>
    </form>
  );
}
