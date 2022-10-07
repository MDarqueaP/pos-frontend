import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

import { environment } from "src/environments/environment";
import { ErrorResponse } from "../models/ApiResponse";
import { AppUser, Role } from "../models/AppUser";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(
      `${environment.API_URL}/users`
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: AppUser[]) => {
        return res;
      })
    );
  }

  newUser(body: AppUser): Observable<Boolean> {
    return this.http.post<Boolean>(
      `${environment.API_URL}/users`,
      body
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: Boolean) => {
        return res;
      })
    );
  }

  updateUser(body: AppUser, id: number): Observable<Boolean> {
    return this.http.put<Boolean>(
      `${environment.API_URL}/users/${id}`,
      body
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: Boolean) => {
        return res;
      })
    );
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${environment.API_URL}/roles`
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: Role[]) => {
        return res;
      })
    );
  }

}