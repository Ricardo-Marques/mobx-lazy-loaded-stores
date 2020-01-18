declare interface IAuthStore {
  login: (opts: { email: string; password: string }) => void;
}
