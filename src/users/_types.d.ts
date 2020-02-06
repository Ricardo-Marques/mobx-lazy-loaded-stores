declare interface IUser {
  id: string;
  name: string;
  age: number;
  todos: ITodo[];
}

declare interface IUsersStore {
  list: IUser[];
  assignUnassignedTodo: (user: IUser) => void;
}
