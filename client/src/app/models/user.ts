export class User {
  constructor(
    public email: string,
    private _token: string,
    public tokenExp: number
  ) {}

  get token() {
    return this._token;
  }
}
