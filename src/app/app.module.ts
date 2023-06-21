import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoPageComponent,
    LoginPageComponent,
    AboutPageComponent,
    LoginFormComponent,
    TodoFormComponent,
    FilterFormComponent,
    TodoItemComponent,
    TodoListComponent,
    NotFoundPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
