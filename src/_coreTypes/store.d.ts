/**
 * Env agnostic stores can be re-used in any environment
 */
declare interface IEnvAgnosticCoreStores {
  auth: IAuthStore;
  lazyStoreRegistry: ILazyStoreRegistry;
}

/**
 * Stores whose implementation cannot be shared
 */
declare interface IEnvSpecificCoreStores {
  sessionStorage: ISessionStorage;
}

/**
 * CoreStore adds onto IEnvAgnosticStores, extending it with stores that must have a specific implementation for their environment
 */
declare interface ICoreStore
  extends IEnvAgnosticCoreStores,
    IEnvSpecificCoreStores {}
