import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message, MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Product } from "src/app/models/Product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;
  msgs!: Message[];
  product: Product | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]],
      price: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999),
      ]],
      description: ['', [
        Validators.required
      ]],
      useCases: ['', [
        Validators.required
      ]],
      formatAvailable: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]],
      stock: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999)
      ]]
    });

    this.product = this.config.data.product;

    if (this.product !== undefined) {
      this.form.setValue({
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        useCases: this.product.useCases,
        formatAvailable: this.product.formatAvailable,
        stock: this.product.stock
      });
    }
  }

  submit(): void {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    if (this.product === undefined) {
      this.productService.newProduct(this.form.value)
      .subscribe({
        next: (res: Boolean) => {
          if (res) {
            this.ref.close('Producto creado');
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

    if (this.product !== undefined) {
      this.productService.updateProduct(this.form.value, this.product.id)
      .subscribe({
        next: (res: Boolean) => {
          if (res) {
            this.ref.close('Producto actualizado');
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

}