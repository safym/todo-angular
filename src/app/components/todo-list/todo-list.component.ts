import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { updateStatusArgs } from "../todo-item/todo-item.component";
import { FilterOptions } from "../filter-form/filter-form.component";
import { TodoItem } from "src/app/models/todo/todo";

export const initialFilterOptions: FilterOptions = {
  titleSubstring: "",
  status: null,
};

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  isFiltered: boolean = false;

  private filterOptions: FilterOptions = initialFilterOptions;
  filteredTodoList: TodoItem[] = [];
  isLoading: boolean = false;

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    this.isLoading = true;
    this.todoService
      .loadTodoList()
      .subscribe({
        next: (response: any) => {
          this.todoList = response.todoList;
          this.todoService.todoList = this.todoList;
        },
      })
      .add(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  addTodo(todo: TodoItem): void {
    this.todoService.addTodoItem(todo);

    if (this.isFiltered) {
      this.filteredTodoList = this.todoService.getfilteredTodoItems(
        this.filterOptions
      );
    }
  }

  deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodoItem(todo);

    if (this.isFiltered) {
      this.filteredTodoList = this.todoService.getfilteredTodoItems(
        this.filterOptions
      );
    }
  }

  updateStatusTodo({ todo, newStatus }: updateStatusArgs): void {
    this.todoService.updateStatusTodoItem(todo, newStatus);
  }

  getfilteredTodoItems(filterOptions: FilterOptions): void {
    this.filterOptions = filterOptions;
    this.filteredTodoList =
      this.todoService.getfilteredTodoItems(filterOptions);
    this.isFiltered = true;
  }

  resetFilter(): void {
    console.log(this.filterOptions);
    this.filterOptions = initialFilterOptions;
    console.log(this.filterOptions);
    this.isFiltered = false;
  }
}
