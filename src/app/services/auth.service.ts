import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ErrorResponse } from "../models/ApiResponse";
import { AuthResponse } from "../models/AuthResponse";
import { LoginRequest } from "../models/LoginRequest";
import { User } from "../models/User";

@Injectable({ providedIn: 'root' })
export class AuthService {

  public user = new BehaviorSubject<User | null>(null);
  public tokenExpirationTimer: any = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public signIn(request: LoginRequest): Observable<boolean> {
    return this.http.post<AuthResponse | any>(
      `${environment.AUTH_URL}/auth/signin`,
      request
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error);
      }),
      map((res: AuthResponse) => {
        const expirationDate = new Date(res.expiresIn);
        const user = new User(res.accessToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expirationDate.getTime() - new Date().getTime());
        localStorage.setItem('userAuthData', JSON.stringify(user));
        return true;
      })
    );
  }

  private autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public logout(): void {
    clearTimeout(this.tokenExpirationTimer);
    this.user.next(null);
    localStorage.removeItem('userAuthData');
    this.router.navigate(['/']);
  }

  public autoLogin(): void {
    let userData: {
      _token: string;
      _tokenExpirationDate: string;
    };
    userData = JSON.parse(localStorage.getItem('userAuthData') || 'null');

    if (!userData) {
      return;
    }

    const expirationDate = new Date(Date.parse(userData._tokenExpirationDate));
    const loadedUser = new User(userData._token, expirationDate);

    if (loadedUser) {
      this.user.next(loadedUser);
      this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

}