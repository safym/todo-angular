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

  deleteTodo(): void {
    this.deleteTodoEvent.emit(this.todoItem);
  }

  updateStatusTodo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value as Status;

    this.updateTodoEvent.emit({
      todo: this.todoItem,
      newStatus: newStatus,
    });
  }
}
