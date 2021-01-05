import { Component, Input, OnInit } from "@angular/core";
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../../models/article/article";
import { Store, Select } from "@ngxs/store";
import { ArticleState } from "../../models/article/article.state";
import { Observable } from "rxjs";
import { AddArticle } from "../../models/article/article.action";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../models/user/user";
import { UserState } from "../../models/user/user.state";

@Component({
  selector: "compte",
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})

export class CompteComponent {

  user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.user$ = this.store.select(UserState.getUser);
    this.user$.subscribe(res => console.log(res));
  }

}