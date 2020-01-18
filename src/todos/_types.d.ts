declare interface ITodo {
  id: string;
  text: string;
  done: boolean;
}

declare interface ITodosStore {
  list: Array<ITodo>;
  addTodo(todo: ITodo): void;
  toggleDoneStatus(todo: ITodo): void;
}
