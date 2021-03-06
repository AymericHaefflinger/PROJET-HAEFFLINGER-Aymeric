import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { ProduitComponent } from "./module/produit/produit.component";
import { HeaderComponent } from "./module/header/header.component";
import { PanierComponent } from "./module/panier/panier.component";
import { AccueilComponent } from "./module/accueil/accueil.component";
import { DetailComponent } from "./module/detail/detail.component";
import { CompteComponent } from "./module/compte/compte.component";
import { AuthComponent } from "./module/auth/auth.component";
import { registerComponent } from "./module/register/register.component";
import { HttpServiceService } from "../http-service.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ApiHttpInterceptor } from './api-http-interceptor';

import { AppRoutingModule } from "./app-routing.module";

import { NgxsModule } from "@ngxs/store";
import { ArticleState } from "./models/article/article.state";
import { UserState } from "./models/user/user.state";
import { CustomErrorHandler } from "./errorHandler.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ArticleState, UserState])
  ],
  declarations: [
    AppComponent,
    ProduitComponent,
    HeaderComponent,
    PanierComponent,
    AccueilComponent,
    DetailComponent,
    CompteComponent,
    AuthComponent, 
    registerComponent
  ],
  bootstrap: [AppComponent],
  providers: [HttpServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true 
    },
    {
      provide: ErrorHandler, 
      useClass: CustomErrorHandler
    }],
  exports: [AppRoutingModule, HeaderComponent, ProduitComponent]
})
export class AppModule {}
