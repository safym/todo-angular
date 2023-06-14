import { Injectable } from '@angular/core';
import { Status, Todo } from '../models/todo';
import { TodoItem } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList: Todo[] = [
    {
      id: 1,
      title: 'first todo',
      status: "normal",
    },
    {
      id: 2,
      title: 'second todo',
      status: "important",
    },
    {
      id: 3,
      title: 'third todo',
      status: "completed",
    },
  ]

  getTodoItems(): Todo[] {
    return this.todoList;
  }

  deleteTodoItem(item: Todo) {
    const index = this.todoList.indexOf(item);

    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }

  addTodoItem(item: TodoItem) {
    this.todoList.push(item);
  }

  updateStatusTodoItem(item: TodoItem, newStatus: Status): void {
    item.status = newStatus;
  }
}
