import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccueilComponent } from "./module/accueil/accueil.component";
import { CompteComponent } from "./module/compte/compte.component";
import { AuthComponent } from './module/auth/auth.component';
import { registerComponent } from './module/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "/accueil", pathMatch: "full" },
  { path: "accueil", component: AccueilComponent },
  {
    path: "magasin",
    loadChildren: () =>
      import("./module/magasin-rooting.module").then(m => m.MagasinRoutingModule)
  },
  { path: "compte", component: CompteComponent },
  { path: "auth", component: AuthComponent },
  { path: "register", component: registerComponent },
  { path: "**", redirectTo: "/accueil", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
