import { Component, Input } from "@angular/core";
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../article/article";
import { Store, Select } from "@ngxs/store";
import { AddArticle } from "../article/article.action";
import { ArticleState } from "../article/article.state";
import { Observable } from "rxjs";

@Component({
  selector: "header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  articlePanier$: Observable<Article[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.articlePanier$ = this.store.select(ArticleState.getArticles);
  }
}
