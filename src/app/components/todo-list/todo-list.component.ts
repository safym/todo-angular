import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { updateStatusArgs } from "../todo-item/todo-item.component";
import { FilterOptions } from "../filter-form/filter-form.component";
import { TodoItem } from "src/app/models/todo";

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
  public todoList: TodoItem[] = [];
  public isFiltered: boolean = false;
  private filterOptions: FilterOptions = initialFilterOptions;
  public filteredTodoList: TodoItem[] = [];
  public isLoading: boolean = false;

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.getTodoList();
  }

  public getTodoList() {
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

  public addTodo(todo: TodoItem): void {
    this.todoService.addTodoItem(todo);

    if (this.isFiltered) {
      this.filteredTodoList = this.todoService.getfilteredTodoItems(
        this.filterOptions
      );
    }
  }

  public deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodoItem(todo);

    if (this.isFiltered) {
      this.filteredTodoList = this.todoService.getfilteredTodoItems(
        this.filterOptions
      );
    }
  }

  public updateStatusTodo({ todo, newStatus }: updateStatusArgs): void {
    this.todoService.updateStatusTodoItem(todo, newStatus);
  }

  public getfilteredTodoItems(filterOptions: FilterOptions): void {
    this.filterOptions = filterOptions;
    this.filteredTodoList =
      this.todoService.getfilteredTodoItems(filterOptions);
    this.isFiltered = true;
  }

  public resetFilter() {
    console.log(this.filterOptions);
    this.filterOptions = initialFilterOptions;
    console.log(this.filterOptions);
    this.isFiltered = false;
  }
}
