import { useCoreStore, CoreStore } from "./store";

export class LazyStoreRegistry implements ILazyStoreRegistry {
  private _stores: Record<string, Object> = {};
  private _coreStore: ICoreStore;

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;
  }

  get<LazyStore>(storeName: string) {
    if (this._stores[storeName]) {
      return this._stores[storeName] as LazyStore;
    }
    return null;
  }

  set<LazyStore>(
    storeName: string,
    storeGetter: (coreStore: CoreStore) => LazyStore
  ) {
    const store = storeGetter(this._coreStore);
    if (this._stores[storeName] != null) {
      console.log(`store injected: "${storeName}"`);
    }
    this._stores[storeName] = store;
  }

  getOrSetAndReturn<LazyStore>(
    storeName: string,
    storeGetter: (CoreStore: CoreStore) => LazyStore
  ): LazyStore {
    const previouslyInstantiatedStore = this.get(storeName);
    if (previouslyInstantiatedStore) {
      console.log(
        `LazyStoreRegistry - store with the name "${storeName}" detected. Using existing instance.`
      );
      return previouslyInstantiatedStore as LazyStore;
    }

    console.log(
      `LazyStoreRegistry - store with the name "${storeName}" not detected. Creating a new instance from the getter method.`
    );

    this.set(storeName, storeGetter);
    return this.get(storeName) as LazyStore;
  }
}

export const useLazyStoreInstanceOrCreate = <LazyStore>(opts: {
  storeName: string;
  storeGetter: (coreStore: ICoreStore) => LazyStore;
}): LazyStore => {
  const coreStore = useCoreStore();
  return coreStore.lazyStoreRegistry.getOrSetAndReturn(
    opts.storeName,
    opts.storeGetter
  );
};
