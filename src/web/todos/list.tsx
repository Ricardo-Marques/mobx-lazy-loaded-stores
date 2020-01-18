import { useTodosState } from "todos/store";

export function TodoList() {
  const todos = useTodosState();
  console.log(todos.list);
  return null;
}
