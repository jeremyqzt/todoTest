import { TodoItem } from "../interfaces/interface";

export const todoItemFactory = (numItems: number): TodoItem[] => {
  const ret: TodoItem[] = [];

  for (let i = 0; i < numItems; i++) {
    const todoItem: TodoItem = {
      userId: i,
      id: i,
      title: `title${i}`,
      completed: true,
    };
    ret.push(todoItem);
  }

  return ret;
};
