import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { OrderItem } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { CheckoutFormComponent } from "../checkout-form/checkout-form.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  orderList: OrderItem[] = [];
  total: number = 0;

  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private orderService: OrderService,
    private dialogService: DialogService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.orderService.order.subscribe((res: OrderItem[] | null) => {
      this.orderList = res!;
      if (this.orderList) {
        this.orderList.forEach((item: OrderItem) => {
          this.total = this.total + (item.product.price * item.quantity);
        });
      }
    })
  }

  remove(itemToDelete: OrderItem): void {
    this.orderList = this.orderList.filter((item) => item !== itemToDelete);
    this.orderService.removeFromCart(this.orderList);
    this.total = 0;
    this.orderList.forEach((item: OrderItem) => {
      this.total = this.total + (item.product.price * item.quantity);
    })
  }

  checkout(): void {
    this.ref = this.dialogService.open(CheckoutFormComponent, {
      width: '80%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        total: this.total,
        orderList: this.orderList
      }
    });
    this.ref.onClose.subscribe((message: string) => {
      if (message) {
        this.messageService.add({ severity: 'info', detail: message });
      }
    });
  }

}