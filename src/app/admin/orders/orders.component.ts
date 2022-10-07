import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  orders: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAll()
      .subscribe({
        next: (res: any) => {
          this.orders = res;
        },
        error: (message: string) => {
          console.log(message);
        }
      });
  }
  
}