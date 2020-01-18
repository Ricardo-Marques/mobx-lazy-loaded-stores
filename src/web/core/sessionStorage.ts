export class WebSessionStorage implements ISessionStorage {
  set() {}
  get<ReturnType>() {
    // @TODO actually get
    return (null as unknown) as ReturnType;
  }

  delete() {}
}
