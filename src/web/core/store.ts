import { CoreStore } from "core/store";
import { WebSessionStorage } from "./sessionStorage";

const webCoreStoreConstructors = {
  sessionStorage: () => new WebSessionStorage()
};

export const webCoreStore = new CoreStore(webCoreStoreConstructors);
