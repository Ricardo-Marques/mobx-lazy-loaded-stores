declare interface ITodo {
  id: string;
  text: string;
  done: boolean;
  assignedUserId: string;
}

declare interface ITodosStore {
  list: Array<ITodo>;
  addTodo(todo: ITodo): void;
  toggleDoneStatus(todo: ITodo): void;
  assignUser(todo: ITodo, user: IUser): void;
}
