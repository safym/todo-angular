import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Status, Todo } from "src/app/models/todo/todo.interface";
import { TodoItem } from "src/app/models/todo/todo";

export interface updateStatusArgs {
  todo: TodoItem;
  newStatus: Status;
}

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todoItem: TodoItem;
  @Output() deleteTodoEvent = new EventEmitter<TodoItem>();
  @Output() updateTodoEvent = new EventEmitter<updateStatusArgs>();

  public deleteTodo() {
    this.deleteTodoEvent.emit(this.todoItem);
  }

  public updateStatusTodo(e: any) {
    this.updateTodoEvent.emit({
      todo: this.todoItem,
      newStatus: e.target.value,
    });
  }
}
