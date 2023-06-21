import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import { Status } from "src/app/models/todo/todo.interface";
import { TodoItem } from "src/app/models/todo/todo";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  title: string = "";
  status: Status = "normal";

  @Output() addTodoEvent = new EventEmitter<TodoItem>();

  changeStatus(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.status = target.value as Status;
  }

  onSubmit(): void {
    const newTodo = new TodoItem(Date.now(), this.title, this.status);

    this.addTodoEvent.emit(newTodo);

    this.title = "";
    this.status = "normal";
  }
}
