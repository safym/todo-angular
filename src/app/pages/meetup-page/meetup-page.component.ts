import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { MeetupService } from "src/app/services/meetup.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-page",
  templateUrl: "./meetup-page.component.html",
})
export class MeetupPageComponent {
  public result: Object;

  constructor(private meetupService: MeetupService, private http: HttpClient) {}

  onClick() {
    this.meetupService
      .getUsers()
      .subscribe({
        next: (response) => {
          this.result = response;
          console.log("next");
        },
        error: (error) => {
          console.error("error", error);
        },
        complete: () => {
          console.log("complete");
        },
      })
      .add(() => {
        console.log("finally");
      });
  }
}
