import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authTokenKey = "auth_token";

  constructor(private http: HttpClient) {}

  public get user() {
    const token = this.getToken();

    if (token) {
      return this.parseJwt(token);
    } else {
      return null;
    }
  }

  public login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(`${environment.baseUrl}/auth/login`, body, {
      headers,
    });
  }

  public logout() {
    localStorage.removeItem(this.authTokenKey);
  }

  public setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  public isLoggedIn(): boolean {
    return this.user;
  }

  private getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  private parseJwt(token: string) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}
