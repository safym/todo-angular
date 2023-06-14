import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/models/todo";
import { updateStatusArgs } from "../todo-item/todo-item.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoItems();
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodoItem(todo);
  }

  addTodo(todo: Todo): void {
    this.todoService.addTodoItem(todo);
  }

  updateStatusTodo({ todo, newStatus }: updateStatusArgs): void {
    this.todoService.updateStatusTodoItem(todo, newStatus);
  }
}
