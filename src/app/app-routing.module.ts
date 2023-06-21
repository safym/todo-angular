import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "about", component: AboutPageComponent},
  { path: "todo", component: TodoPageComponent, canActivate: [AuthGuard]},
  { path: "404", component: NotFoundPageComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
