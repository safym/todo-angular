import { Status, Todo } from "./todo.interface";

export class TodoItem implements Todo {
  id: number;
  title: string;
  status: Status;

  constructor(id: number, title: string, status: Status) {
    this.id = id;
    this.title = title;
    this.status = status;
  }
}
