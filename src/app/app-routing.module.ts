import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "about", component: AboutPageComponent },
  { path: "todo", component: TodoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
