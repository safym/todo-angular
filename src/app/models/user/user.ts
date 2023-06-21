import { IUser, Role } from "./user.interface";

export class User implements IUser {
  public id: number;
  public iat: number;
  public exp: number;
  public email: string;
  public roles: Role[];

  constructor({ id, iat, exp, email, roles }: IUser) {
    this.id = id;
    this.iat = iat;
    this.exp = exp;
    this.email = email;
    this.roles = roles;
  }
}
