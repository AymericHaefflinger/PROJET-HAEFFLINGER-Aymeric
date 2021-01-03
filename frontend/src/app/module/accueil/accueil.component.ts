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
  selector: "accueil",
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {}
