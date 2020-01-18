import { useLazyStoreInstanceOrCreate } from "core/lazyStoreRegistry";

const storeName = "todos";

export default class TodosStore implements ITodosStore {
  private _coreStore: ICoreStore;

  public storeName = storeName;
  public list = [];

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;
  }

  private getList() {
    // can call methods from core store, or other lazy stores
    // @TODO move useLazyStoreInstanceOrCreate to coreStore.lazyStoreRegistry to allow
    // getting an existing store instance or injecting a new store instance
    // from other lazy stores, not just from react hooks
    //
    // considerations -> how would this class know how to create a new store instance?
    // maybe all lazy stores can _only_ take "coreStore" in their constructor so their constructor signature is always known
  }
}

export const useTodosState = () =>
  useLazyStoreInstanceOrCreate<ITodosStore>({
    storeName,
    storeGetter: coreStore => new TodosStore(coreStore)
  });
