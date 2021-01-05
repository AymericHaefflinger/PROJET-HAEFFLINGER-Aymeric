import { Component, Input } from "@angular/core";
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../../models/article/article";
import { Store, Select } from "@ngxs/store";
import { AddArticle } from "../../models/article/article.action";
import { ArticleState } from "../../models/article/article.state";
import { User } from "../../models/user/user";
import { UserState } from "../../models/user/user.state";
import { Observable } from "rxjs";

@Component({
  selector: "header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  articlePanier$: Observable<Article[]>;
  user$: Observable<User>;


  constructor(private store: Store) {}

  ngOnInit() {
    this.articlePanier$ = this.store.select(ArticleState.getArticles);
      this.user$ = this.store.select(UserState.getUser);
    }
  
}
