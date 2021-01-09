import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from './models/user/user.state';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  jwtToken : string;

  constructor(private store: Store) { 
    this.store.select(UserState.GetLoggedToken).subscribe(token=>
        this.jwtToken = token
    );
  }
   
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Authorization': this.jwtToken,
      },
    });

    return next.handle(request);
  }
}