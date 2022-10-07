import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutes } from './admin.routing';
import { OrdersComponent } from './orders/orders.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductsComponent } from './products/products.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    ProductsComponent,
    ProductFormComponent,
    OrdersComponent
  ],
  imports: [
    RouterModule.forChild(AdminRoutes),
    SharedModule
  ],
  entryComponents: [
    UserFormComponent,
    ProductFormComponent
  ]
})
export class AdminModule { }
