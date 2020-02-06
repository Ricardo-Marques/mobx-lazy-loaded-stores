import { computed, observable, action, reaction } from "mobx";

import { useLazyStoreInstanceOrCreate } from "core/lazyStoreRegistry";
import { todosStoreName, todosStoreGetter } from "todos/store";

export const usersStoreName = "users";

const MOCK_USERS: Record<string, IUser> = {
  userId1: {
    id: "userId1",
    name: "Jake",
    age: 25,
    todos: []
  },
  userId2: {
    id: "userId2",
    name: "Paul",
    age: 30,
    todos: []
  }
};

export default class UsersStore implements IUsersStore {
  private _coreStore: ICoreStore;
  private _todosStore: ITodosStore;

  @observable
  private _usersRecord: Record<string, IUser> = {};

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;
    this._todosStore = this._coreStore.lazyStoreRegistry.getOrSetAndReturn(
      todosStoreName,
      todosStoreGetter
    );

    this._todosStore.list.forEach(todo => {
      if (todo.assignedUserId) {
        MOCK_USERS[todo.assignedUserId].todos.push(todo);
      }
    });
    this._usersRecord = MOCK_USERS;
  }

  @computed
  public get list() {
    return Object.keys(this._usersRecord).map(
      (userId: string) => this._usersRecord[userId]
    );
  }

  @action
  public assignUnassignedTodo(user: IUser) {
    const unassignedTodo = this._todosStore.list.find(
      todo => todo.assignedUserId === ""
    );

    if (unassignedTodo) {
      user.todos.push(unassignedTodo);
      this._todosStore.assignUser(unassignedTodo, user);
    }
  }
}

export function usersStoreGetter(coreStore: ICoreStore) {
  return new UsersStore(coreStore);
}

export const useUsersStore = () =>
  useLazyStoreInstanceOrCreate<IUsersStore>({
    storeName: usersStoreName,
    storeGetter: usersStoreGetter
  });
