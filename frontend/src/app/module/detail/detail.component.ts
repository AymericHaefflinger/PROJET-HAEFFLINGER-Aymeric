import { Component, Input } from "@angular/core";
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../../models/article/article";
import { Store, Select } from "@ngxs/store";
import { ArticleState } from "../../models/article/article.state";
import { Observable } from "rxjs";
import { AddArticle } from "../../models/article/article.action";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "detail",
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  allArt: Article[];
  art: Article;

  constructor(
    public HttpServiceService: HttpServiceService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  getData(): void {
    this.HttpServiceService.getData().subscribe(Articles =>
      Articles.forEach((myObject, index) => {
        if (myObject.nom == this.route.snapshot.params.id) {
          this.art = myObject;
        }
      })
    );
  }

  addArticle(a: Article) {
    if (this.art.nom != "") {
      this.store.dispatch(new AddArticle(a)).subscribe();
    }
  }

  ngOnInit() {
    this.getData();
  }
}
