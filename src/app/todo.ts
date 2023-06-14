import { Status, Todo } from "./models/todo";

export class TodoItem implements Todo {
  public id: number;
  public title: string;
  public status: Status;

  constructor(id: number, title: string, status: Status) {
    this.id = id;
    this.title = title;
    this.status = status;
  }
}
