export class AuthUserModel {
  constructor(
    public email: string,
    private _idToken: string,
    public localId: string,
    private _expirationDate: Date
  ) {}

  get token() {
    if (!this._idToken || new Date() > this._expirationDate) return null;
    return this._idToken;
  }
}
