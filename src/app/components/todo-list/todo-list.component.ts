import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { updateStatusArgs } from "../todo-item/todo-item.component";
import { FilterOptions } from "../filter-form/filter-form.component";
import { TodoItem } from "src/app/models/todo";

export const initialFilterOptions: FilterOptions = {
  titleSubstring: "",
  status: null,
}

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  isFiltered: boolean = false;
  filterOptions: FilterOptions = initialFilterOptions;
  filteredTodoList: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoItems();
  }

  deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodoItem(todo);
    
    if (this.isFiltered) {
      this.filteredTodoList = this.todoService.getfilteredTodoItems(this.filterOptions);
    }
  }

  addTodo(todo: TodoItem): void {
    this.todoService.addTodoItem(todo);

    if (this.isFiltered) {
      this.filteredTodoList = this.todoService.getfilteredTodoItems(this.filterOptions);
    }
  }

  updateStatusTodo({ todo, newStatus }: updateStatusArgs): void {
    this.todoService.updateStatusTodoItem(todo, newStatus);
  }

  getfilteredTodoItems(filterOptions: FilterOptions): void {
    this.filterOptions = filterOptions;
    this.filteredTodoList = this.todoService.getfilteredTodoItems(filterOptions);
    this.isFiltered = true;
  }

  resetFilter() {
    console.log(this.filterOptions)
    this.filterOptions = initialFilterOptions;
    console.log(this.filterOptions)
    this.isFiltered = false;
  }
}
