export class AuthStore implements IAuthStore {
  private _coreStore: ICoreStore;

  constructor(coreStore: ICoreStore) {
    this._coreStore = coreStore;
  }

  login() {
    // can call methods on coreStore, for example...
    this._coreStore.sessionStorage.set<string>({
      key: "accessToken",
      value: "someAccessTokenIGotFromAPI"
    });
    // however, the important part is that this will be re-usable in any environment (be it node, browser, or react-native)
    // since those platforms can define their own session storage and pass it to their store constructor
    //
    // routing and api requests would follow the same pattern: instead of calling a singleton that's directly imported from a path
    // we can make the request to this._coreStore.graphqlClient.fetch(someGQLQuery)
  }
}
