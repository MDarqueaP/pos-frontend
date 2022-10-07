import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Product } from "src/app/models/Product";

import { ProductService } from "src/app/services/product.service";
import { ProductFormComponent } from "./product-form/product-form.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe({
        next: (res: Product[]) => {
          this.products = res;
        },
        error: (message: string) => {
          console.log(message);
        }
      });
  }

  newProduct() {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Nuevo',
      width: '70%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        product: undefined
      }
    });
    this.ref.onClose.subscribe((message: string) => {
      if (message) {
        this.messageService.add({ severity: 'info', detail: message });
        this.getAllProducts();
      }
    });
  }

  edit(product: Product) {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Editar',
      width: '70%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        product: product
      }
    });
    this.ref.onClose.subscribe((message: string) => {
      if (message) {
        this.messageService.add({ severity: 'info', detail: message });
        this.getAllProducts();
      }
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

}