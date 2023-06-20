import { Injectable } from "@angular/core";
import { Status, Todo } from "../models/todo.interface";
import { TodoItem } from "../models/todo";
import { FilterOptions } from "../components/filter-form/filter-form.component";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private _todoList: TodoItem[] = [];

  constructor(private http: HttpClient) {}

  get todoList(): TodoItem[] {
    return this._todoList;
  }

  set todoList(todoList: TodoItem[]) {
    this._todoList = todoList;
  }

  loadTodoList() {
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(`/assets/data/todo.json`, {
      headers,
    });
  }

  deleteTodoItem(item: TodoItem) {
    const todoIndex = this._todoList.indexOf(item);

    if (todoIndex !== -1) {
      this.deleteArrayItem(this._todoList as [], todoIndex);
    }
  }

  private deleteArrayItem(array: [], index: number) {
    return array.splice(index, 1);
  }

  addTodoItem(item: TodoItem) {
    this._todoList.push(item);
  }

  updateStatusTodoItem(item: TodoItem, newStatus: Status): void {
    item.status = newStatus;
  }

  getfilteredTodoItems({ titleSubstring, status }: FilterOptions): TodoItem[] {
    const filteredTodoItems: TodoItem[] = this._todoList.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(titleSubstring.toLowerCase());
      const matchStatus = status ? item.status === status : true;

      return matchSearch && matchStatus;
    });

    return [...filteredTodoItems];
  }
}
