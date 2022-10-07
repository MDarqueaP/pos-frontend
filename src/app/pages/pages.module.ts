import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './home/product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutes } from './pages.routing';

@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    CartComponent,
    ProductDetailComponent,
    CheckoutFormComponent
  ],
  imports: [
    RouterModule.forChild(PagesRoutes),
    SharedModule
  ],
  entryComponents: [
    ProductDetailComponent,
    CheckoutFormComponent
  ]
})
export class PagesModule { }
