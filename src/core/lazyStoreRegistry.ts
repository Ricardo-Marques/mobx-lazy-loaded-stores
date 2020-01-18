import { useCoreStore } from "./store";

export class LazyStoreRegistry implements ILazyStoreRegistry {
  private _stores: Record<string, ILazyStore> = {};
  private _coreStore: ICoreStore;

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;
  }

  get<LazyStore extends ILazyStore>(storeName: string) {
    if (this._stores[storeName]) {
      return this._stores[storeName] as LazyStore;
    }
    return null;
  }

  safeGet<LazyStore extends ILazyStore>(storeName: string) {
    if (this._stores[storeName]) {
      return this._stores[storeName] as LazyStore;
    }
    throw Error("lazyStoreRegistry - no store injected ");
  }

  set<StoreGetter extends (coreStore: ICoreStore) => ILazyStore>(
    storeGetter: StoreGetter
  ) {
    const store = storeGetter(this._coreStore);
    if (this._stores[store.storeName] != null) {
      console.log(`store injected: "${store.storeName}"`);
    }
    this._stores[store.storeName] = store;
  }
}

export const useLazyStoreInstanceOrCreate = <
  LazyStore extends ILazyStore
>(opts: {
  storeName: string;
  storeGetter: (coreStore: ICoreStore) => LazyStore;
}) => {
  const coreStore = useCoreStore();
  let lazyStore = coreStore.lazyStoreRegistry.get(opts.storeName);

  if (lazyStore == null) {
    console.log(
      `useLazyStoreInstanceOrCreate - store with the name "${opts.storeName}" not detected. Creating a new instance from the getter method.`
    );
    lazyStore = opts.storeGetter(coreStore);
  } else {
    console.log(
      `useLazyStoreInstanceOrCreate - store with the name "${opts.storeName}" detected. Using existing instance.`
    );
  }

  return lazyStore as LazyStore;
};
