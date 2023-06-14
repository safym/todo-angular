import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Status, Todo } from "src/app/models/todo";
import { TodoItem } from "src/app/todo";

export interface updateStatusArgs {
  todo: Todo;
  newStatus: Status;
}

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
})
export class TodoItemComponent {
  @Input() todoItem: TodoItem;
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() updateTodoEvent = new EventEmitter<updateStatusArgs>();

  deleteTodo() {
    this.deleteTodoEvent.emit(this.todoItem);
  }

  updateStatusTodo(e: any) {
    this.updateTodoEvent.emit({
      todo: this.todoItem,
      newStatus: e.target.value,
    });
  }
}
