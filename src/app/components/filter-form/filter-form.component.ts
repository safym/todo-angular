import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import { Status } from "src/app/models/todo/todo.interface";

export interface FilterOptions {
  titleSubstring: string;
  status: Status;
}

@Component({
  selector: "app-filter-form",
  templateUrl: "./filter-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent {
  titleSubstring: string = "";
  status: Status = null;

  @Output() filterTodoItemsEvent = new EventEmitter<FilterOptions>();
  @Output() resetFilterEvent = new EventEmitter<any>();

  changeStatus(e: any) {
    this.status = e.target.value;
  }

  onSubmit() {
    this.filterTodoItemsEvent.emit({
      titleSubstring: this.titleSubstring,
      status: this.status,
    });
  }

  onReset() {
    this.resetFilterEvent.emit();
    this.titleSubstring = "";
    this.status = null;
  }
}
