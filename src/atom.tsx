import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});
export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: (() => {
    const item = localStorage.getItem('ToDoList');
    if (item == null) return [];
    else return JSON.parse(item) as IToDo[];
  })(),
});

export const ToDoSelector = selector({
  key: 'ToDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    localStorage.setItem('ToDoList', JSON.stringify(toDos));
    return toDos.filter((toDo) => toDo.category === category);
  },
});
