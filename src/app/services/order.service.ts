import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ErrorResponse } from "../models/ApiResponse";

import { OrderItem } from "../models/Order";
import { Product } from "../models/Product";

@Injectable({ providedIn: 'root' })
export class OrderService {

  public order = new BehaviorSubject<OrderItem[] | null>(null);

  constructor(private http: HttpClient) { }

  addToCart(product: Product, quantity: number): void {

    let orderList: OrderItem[] = JSON.parse(localStorage.getItem('order') || '[]');

    const newItem: OrderItem = {
      product: product,
      quantity: quantity
    };

    orderList.push(newItem);

    this.order.next(orderList);
    localStorage.setItem('order', JSON.stringify(orderList));
  }

  getOrderOnLoad(): void {
    const orderList = JSON.parse(localStorage.getItem('order') || 'null');

    if (!orderList) {
      return;
    }

    this.order.next(orderList);
  }

  removeFromCart(orderList: OrderItem[]): void {
    this.order.next(orderList);
    localStorage.setItem('order', JSON.stringify(orderList));
  }

  clearCart(): void {
    this.order.next(null);
    localStorage.removeItem('order');
  }

  newOrder(body: any): Observable<Boolean> {
    return this.http.post<Boolean>(
      `${environment.API_URL}/app/orders`,
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

  getAll(): Observable<any> {
    return this.http.get<any>(
      `${environment.API_URL}/orders`
    ).pipe(
      catchError((error: ErrorResponse) => {
        return throwError(() => error.error.message);
      }),
      map((res: any) => {
        return res;
      })
    );
  }

}