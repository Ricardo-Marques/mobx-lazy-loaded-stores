declare interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

declare interface ITodosStore extends ILazyStore {
  list: Array<ITodo>;
}
