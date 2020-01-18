declare interface ISessionStorage {
  set: <ValueType>(opts: { key: string; value: ValueType }) => void;
  get: <ReturnType>(opts: { key: string }) => ReturnType | null;
  delete: (opts: { key: string }) => void;
}

declare interface ISessionStorageItem<ValueType> {
  value: ValueType;
}
