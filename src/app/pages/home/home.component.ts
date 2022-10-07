import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  quantity: number = 1;

  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProductsHome()
      .subscribe({
        next: (res: Product[]) => {
          this.products = res;
        },
        error: (message: string) => {
          console.log(message);
        }
      });
  }

  openDetail(product: Product): void {
    this.ref = this.dialogService.open(ProductDetailComponent, {
      header: product.name,
      width: '50%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        product: product
      }
    });
    this.ref.onClose.subscribe((message: string) => {
      if (message) {
        this.messageService.add({ severity: 'info', detail: message });
      }
    });
  }

}
