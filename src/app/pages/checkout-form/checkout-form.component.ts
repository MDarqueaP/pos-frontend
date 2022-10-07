import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message, MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { OrderItem } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html'
})
export class CheckoutFormComponent implements OnInit {

  orderList: OrderItem[] = [];
  total: number = 0;

  form!: FormGroup;
  submitted: boolean = false;
  msgs!: Message[];

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.orderList = this.config.data.orderList;
    this.total = this.config.data.total;

    this.form = this.formBuilder.group({
      fullname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      idNumber: ['', [
        Validators.required
      ]]
    });
  }

  submit(): void {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    const request = {
      detail: {
        total: this.total,
        fullname: this.form.value.fullname,
        email: this.form.value.email,
        address: this.form.value.address,
        idNumber: this.form.value.idNumber
      },
      products: this.orderList
    }

    this.orderService.newOrder(request)
      .subscribe({
        next: (res: Boolean) => {
          if (res) {
            this.orderService.clearCart();
            this.ref.close('Tu orden ha sido enviada, gracias por preferirnos');
          }
        },
        error: (error: string) => {
          this.messageService.add({
            severity: 'warn',
            detail: error,
          });
        }
      });

  }

}