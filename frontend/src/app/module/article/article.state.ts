import { AddArticle, RemoveArticle } from "./article.action";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Article } from "./article";
import { Injectable } from "@angular/core";
import { patch, removeItem } from "@ngxs/store/operators";

export interface ArticleStateModel {
  articles: Article[];
}

@State<ArticleStateModel>({
  name: "articles",
  defaults: { articles: [] }
})
@Injectable()
export class ArticleState {
  @Selector()
  static getArticles(state: ArticleStateModel) {
    return state.articles;
  }

  @Action(AddArticle)
  add(
    { getState, patchState }: StateContext<ArticleStateModel>,
    { payload }: AddArticle
  ) {
    const state = getState();
    patchState({
      articles: [...state.articles, payload]
    });
  }

  @Action(RemoveArticle)
  rm(
    { getState, patchState }: StateContext<ArticleStateModel>,
    { payload }: RemoveArticle
  ) {
    const state = getState();
    state.articles.splice(state.articles.indexOf(payload), 1);
  }
}
