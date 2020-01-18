declare interface ILazyStoreRegistry {
  get<LazyStoreInstance extends ILazyStore>(
    storeName: string
  ): ?LazyStoreInstance;
  set: (lazyStoreGetter: (coreStore: ICoreStore) => ILazyStore) => void;
}

declare interface ILazyStore {
  // a lazy store must have at least a name that is used to access the store instance within the lazy store registry
  storeName: string;
}
