export class WebSessionStorage implements ISessionStorage {
  set<ValueType>(opts: { key: string; value: ValueType }) {
    sessionStorage.setItem(opts.key, JSON.stringify({ value: opts.value }));
  }
  get<ReturnType>(opts: { key: string }) {
    const stringValue = sessionStorage.getItem(opts.key) as string | null;

    if (!stringValue) {
      return null;
    }

    const { value } = JSON.parse(stringValue) as ISessionStorageItem<
      ReturnType
    >;
    return value;
  }

  delete(opts: { key: string }) {
    sessionStorage.removeItem(opts.key);
  }
}
