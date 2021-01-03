import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './environments/environments';
import { Article } from './app/module/article/article';

@Injectable()
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  getData() : Observable<Article[]> {
    return this.http.get<Article[]>(environment.baseUrl + "/bouchon.json");
  }

  searchArticle(term: string): Observable<Article[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('nom', term) } : {};

    return this.http.get<Article[]>(environment.baseUrl + "/bouchon.json", options)
  }
}