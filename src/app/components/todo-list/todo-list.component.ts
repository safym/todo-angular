import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { updateStatusArgs } from "../todo-item/todo-item.component";
import { filterTodoItemsArgs } from "../filter-form/filter-form.component";
import { TodoItem } from "src/app/todo";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  filteredTodoList: TodoItem[] = [];
  isFiltered: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoItems();
  }

  deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodoItem(todo);
  }

  addTodo(todo: TodoItem): void {
    this.todoService.addTodoItem(todo);
  }

  updateStatusTodo({ todo, newStatus }: updateStatusArgs): void {
    this.todoService.updateStatusTodoItem(todo, newStatus);
  }

  getfilteredTodoItems({ titleSubstring, status }: filterTodoItemsArgs): void {
    this.filteredTodoList = this.todoService.getfilteredTodoItems(titleSubstring, status);
    this.isFiltered = true;
  }

  resetFilter() {
    this.isFiltered = false
  }
}
