import { Component, Input } from "@angular/core";
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../article/article";
import { Store, Select } from "@ngxs/store";
import { AddArticle } from "../article/article.action";
import { ArticleState } from "../article/article.state";
import { Observable } from "rxjs";
import { toast } from 'materialize-css';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "produit",
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  @Input() name: string;

  Articles: Article[];
  allArticles: Article[];

  constructor(
    public HttpServiceService: HttpServiceService,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  getData(): void {
    this.httpClient.get<any>("/api/article/get",
    { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    .subscribe(data => {
      this.Articles = data[0]
    }, error => {
     toast({html: 'Problème de connexion', classes: 'rounded'});
    });
  }

  getDataInit(): void {
    this.httpClient.get<any>("/api/article/get",
    { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    .subscribe(data => {
      this.setupData(data);
    }, error => {
     toast({html: 'Problème de connexion', classes: 'rounded'});
    });
  }

  setupData(data)
  {
    this.Articles = data[0];
    this.allArticles = data[0];
  }

  searchArticle(searchTerm: string) {
    if (searchTerm) {
      let body = new URLSearchParams();
      body.set('term', searchTerm);

      this.httpClient.post<any>("/api/article/search", body.toString(),
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
      .subscribe(data => {
        this.Articles = data[0]; 
      }, error => {
        toast({html: 'Problème de connexion', classes: 'rounded'});
      });
    } else {
      this.getData();
    }
  }

  ngOnInit() {
    this.getDataInit();
  }

  addArticle(a: Article) {
    this.store.dispatch(new AddArticle(a)).subscribe();
  }
}
