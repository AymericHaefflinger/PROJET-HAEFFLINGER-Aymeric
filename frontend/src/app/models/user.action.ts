import { User } from "./user";

export class AddUser {
  static readonly type = "[user] add";
  constructor(public payload: User) {}
}


export class DisconnectUser{
  static readonly type = '[user] disconnect';

  constructor(){}
}

export class NewJwt{
  static readonly type = '[user] NewJwt';

  constructor(public payload: string){}
}