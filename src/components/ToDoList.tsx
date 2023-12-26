import React from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { Categories, IToDo, ToDoSelector, categoryState } from '../atom';

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const toDo = useRecoilValue(ToDoSelector);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as any);
  };

  return (
    <div>
      <h1>ToDoList</h1>
      <CreateToDo />
      <select value={category} onInput={onInput}>
        <option value='TO_DO'>To Do</option>
        <option value='DOING'>Doing</option>
        <option value='DONE'>Done</option>
      </select>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          margin: 0,
          padding: 0,
        }}
      >
        {toDo.map((aToDo) => (
          <ToDo {...aToDo} key={aToDo.id} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
