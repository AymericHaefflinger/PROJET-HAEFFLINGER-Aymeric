import { AddArticle, RemoveArticle } from "./article.action";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Article } from "./article";
import { Injectable } from "@angular/core";
import { patch, removeItem } from "@ngxs/store/operators";

export interface ArticleStateModel {
  articles: Article[];
  prix: number;
}

@State<ArticleStateModel>({
  name: "articles",
  defaults: { articles: [], prix: 0 }
})
@Injectable()
export class ArticleState {
  @Selector()
  static getArticles(state: ArticleStateModel) {
    return state.articles;
  }

  @Selector()
  static getPrix(state: ArticleStateModel) {
    return state.prix;
  }

  @Action(AddArticle)
  add(
    { getState, patchState }: StateContext<ArticleStateModel>,
    { payload }: AddArticle
  ) {
    const state = getState();
    patchState({
      articles: [...state.articles, payload],
      prix: state.prix + +payload.prix.slice(0, -1)
    });
  }

  @Action(RemoveArticle)
  rm(
    { getState, patchState }: StateContext<ArticleStateModel>,
    { payload }: RemoveArticle
  ) {
    const state = getState();
    patchState({
      prix: state.prix - +payload.prix.slice(0, -1)
    });
    state.articles.splice(state.articles.indexOf(payload), 1);
  }
}
