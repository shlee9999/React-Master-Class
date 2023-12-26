//방법 1
import React from 'react';
import { Categories, IToDo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

export default function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClickComplete = (newCategory: Categories) => () => {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, category: newCategory } : todo
      )
    );
  };
  const onClickDelete = () => {
    setToDos((prev) => prev.filter((toDo) => toDo.id !== id));
  };
  return (
    <li
      style={{
        width: 500,
        borderRadius: 15,
        padding: '10px 15px',
        backgroundColor: 'gray',
      }}
    >
      {text}
      {category !== Categories.DONE && (
        <button onClick={onClickComplete(Categories.DONE)}>DONE!</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={onClickComplete(Categories.TO_DO)}>TO_DO!</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={onClickComplete(Categories.DOING)}>DOING!</button>
      )}
      <button onClick={onClickDelete}>X</button>
    </li>
  );
}
