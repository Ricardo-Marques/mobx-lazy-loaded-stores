import React from "react";

import { AuthStore } from "./authStore";
import { LazyStoreRegistry } from "./lazyStoreRegistry";

export class CoreStore implements ICoreStore {
  public auth: IAuthStore;
  public sessionStorage: ISessionStorage;
  public lazyStoreRegistry: ILazyStoreRegistry;

  constructor(coreStoreConstructors: {
    // every core store constructor gets access to the root of the core store
    // this means they can choose to call methods on other core stores, without initializing a new instance
    // of that store, or relying on a singleton that cannot be easily replaced

    // in addition to making it easy to share code between platforms, this makes it much easier to write unit tests
    // that use a fake implementation of a store to mimic a certain scenario
    sessionStorage: (coreStore: ICoreStore) => ISessionStorage;

    // allow core stores that are shared between platforms to optionally be provided
    // the purpose of this is solely to facilitate unit testing
    auth?: (coreStore: CoreStore) => IAuthStore;
    lazyStoreRegistry?: (coreStore: CoreStore) => ILazyStoreRegistry;
  }) {
    this.sessionStorage = coreStoreConstructors.sessionStorage(this);

    this.auth = coreStoreConstructors.auth
      ? coreStoreConstructors.auth(this)
      : new AuthStore(this);
    this.lazyStoreRegistry = coreStoreConstructors.lazyStoreRegistry
      ? coreStoreConstructors.lazyStoreRegistry(this)
      : new LazyStoreRegistry(this);
  }
}

export const CoreStoreProvider = React.createContext<ICoreStore>(
  (null as unknown) as ICoreStore
);

export const useCoreStore = () => React.useContext(CoreStoreProvider);
