import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { User } from "../models/user/user";
import { IUser } from "../models/user/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authTokenKey = "auth_token";
  private _user: User | null = null;

  constructor(private http: HttpClient) {}

  public get user() {
    const token = this.getToken();

    if (token) {
      const userData: IUser = this.parseJwt(token);
      this._user = new User(userData);

      return this._user;
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
    this._user = null;
  }

  public setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  public isLoggedIn(): boolean {
    return !!this._user;
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
