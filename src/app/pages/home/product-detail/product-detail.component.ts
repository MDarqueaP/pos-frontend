import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Product } from "src/app/models/Product";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  quantity: number = 1;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.product = this.config.data.product;
  }

  addToCart(product: Product, quantity: number): void {
    this.orderService.addToCart(product, quantity);
    this.ref.close('Item añadido al carrito');
  }

}