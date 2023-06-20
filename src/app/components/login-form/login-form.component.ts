import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public email: string;
  public password: string;
  public isLoading: boolean = false;
  public errorMessage: string | null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  onSubmit() {
    this.login(this.email, this.password);
  }

  onInput() {
    this.errorMessage = null;
    this.cdr.detectChanges();
  }

  login(email: string, password: string) {
    this.isLoading = true;
    this.authService
      .login(email, password)
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.authService.setAuthToken(token);
        },
        error: (error) => {
          this.errorMessage = error.error[0] || error.error.message;
        },
        complete: () => {
          this.router.navigate(["/todo"]);
        },
      })
      .add(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }
}
