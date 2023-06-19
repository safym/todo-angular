import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "./pages/about-page/about-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/about", pathMatch: "full" },
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
