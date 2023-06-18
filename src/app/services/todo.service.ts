import { Injectable } from "@angular/core";
import { Status, Todo } from "../models/todo.interface";
import { TodoItem } from "../models/todo";
import { FilterOptions } from "../components/filter-form/filter-form.component";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todoList: TodoItem[] = [
    {
      id: 1,
      title: "first todo",
      status: "normal",
    },
    {
      id: 2,
      title: "second todo",
      status: "important",
    },
    {
      id: 3,
      title: "third todo",
      status: "completed",
    },
  ];

  getTodoItems(): TodoItem[] {
    return this.todoList;
  }

  deleteTodoItem(item: TodoItem) {
    const todoIndex = this.todoList.indexOf(item);

    if (todoIndex !== -1) {
      this.deleteArrayItem(this.todoList as [], todoIndex);
    }
  }

  private deleteArrayItem(array: [], index: number) {
    return array.splice(index, 1);
  }

  addTodoItem(item: TodoItem) {
    this.todoList.push(item);
  }

  updateStatusTodoItem(item: TodoItem, newStatus: Status): void {
    item.status = newStatus;
  }

  getfilteredTodoItems({titleSubstring, status}: FilterOptions): TodoItem[] {
    const filteredTodoItems: TodoItem[] = this.todoList.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(titleSubstring.toLowerCase());
      const matchStatus = item.status === status;

      return matchSearch && matchStatus;
    });

    return [...filteredTodoItems];
  }
}
