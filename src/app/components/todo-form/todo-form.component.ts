import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { Status, Todo } from "src/app/models/todo";
import { TodoItem } from "src/app/todo";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  title: string = "";
  status: Status = "normal";

  @Output() addTodoEvent = new EventEmitter<Todo>();

  changeStatus(e: any) {
    this.status = e.target.value;
  }

  onSubmit() {
    const newTodo = new TodoItem(Date.now(), this.title, this.status);

    this.addTodoEvent.emit(newTodo);

    this.title = "";
    this.status = "normal";
  }
}
