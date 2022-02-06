export interface Context {
  token: TokenContext;
  isAuth: boolean;
}

export interface TokenContext {
  account?: { _id: string; email: string };
  user?: { _id: string; role: number; email: string };
}
