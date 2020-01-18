declare interface ISessionStorage {
  set: <ValueType>(opts: { key: string; value: ValueType }) => void;
  get: <ReturnType>(opts: { key: string }) => ReturnType;
  delete: (opts: { key: string }) => void;
}
