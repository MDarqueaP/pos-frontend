import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

import { environment } from "src/environments/environment";
import { ErrorResponse } from "../models/ApiResponse";
import { Product } from "../models/Product";

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProductsHome(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.API_URL}/app/products`
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: Product[]) => {
        return res;
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.API_URL}/products`
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: Product[]) => {
        return res;
      })
    );
  }

  newProduct(body: Product): Observable<Boolean> {
    return this.http.post<Boolean>(
      `${environment.API_URL}/products`,
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

  updateProduct(body: Product, id: number): Observable<Boolean> {
    return this.http.put<Boolean>(
      `${environment.API_URL}/products/${id}`,
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

}