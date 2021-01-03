import { Article } from "./article";

export class AddArticle {
  static readonly type = "[article] Add";
  constructor(public payload: Article) {}
}

export class RemoveArticle {
  static readonly type = "[article] Remove";
  constructor(public payload: Article) {}
}
