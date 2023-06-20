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

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(`${environment.baseUrl}/auth/login`, body, {
      headers,
    });
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
  }
}
