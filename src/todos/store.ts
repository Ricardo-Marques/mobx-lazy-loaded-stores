import { computed, observable, action, reaction } from "mobx";

import { useLazyStoreInstanceOrCreate } from "core/lazyStoreRegistry";

export const todosStoreName = "todos";

export default class TodosStore implements ITodosStore {
  private _coreStore: ICoreStore;

  @observable
  private _todosRecord: Record<string, ITodo> = {};

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;

    this._getTodosFromStorage();
    this._initTodosStorageAutoSave();
  }

  private _getTodosFromStorage() {
    const storedTodos = this._coreStore.sessionStorage.get<
      Record<string, ITodo>
    >({
      key: "todosRecord"
    });

    if (storedTodos != null) {
      this._todosRecord = storedTodos;
    }
  }

  private _initTodosStorageAutoSave() {
    reaction(
      () =>
        this.list.map(todo => {
          const { done, assignedUserId } = todo;
          return { done, assignedUserId };
        }),
      () => {
        this._coreStore.sessionStorage.set({
          key: "todosRecord",
          value: this._todosRecord
        });
      }
    );
  }

  @computed
  public get list() {
    return Object.keys(this._todosRecord).map(
      (todoId: string) => this._todosRecord[todoId]
    );
  }

  @action
  public addTodo(todo: ITodo) {
    this._todosRecord[todo.id] = todo;
  }

  @action
  public toggleDoneStatus(todo: ITodo) {
    this._todosRecord[todo.id].done = !this._todosRecord[todo.id].done;
  }

  @action
  public assignUser(todo: ITodo, user: IUser) {
    this._todosRecord[todo.id].assignedUserId = user.id;
  }
}

export function todosStoreGetter(coreStore: ICoreStore) {
  return new TodosStore(coreStore);
}

export const useTodosStore = () =>
  useLazyStoreInstanceOrCreate<ITodosStore>({
    storeName: todosStoreName,
    storeGetter: todosStoreGetter
  });
