import { Component, Input } from "@angular/core";
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../article/article";
import { Store, Select } from "@ngxs/store";
import { AddArticle } from "../article/article.action";
import { RemoveArticle } from "../article/article.action";
import { ArticleState } from "../article/article.state";
import { Observable } from "rxjs";

@Component({
  selector: "panier",
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  articlePanier$: Observable<Article[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.articlePanier$ = this.store.select(ArticleState.getArticles);
  }

  removeArticle(a: Article) {
    this.store.dispatch(new RemoveArticle(a)).subscribe();
  }
}
