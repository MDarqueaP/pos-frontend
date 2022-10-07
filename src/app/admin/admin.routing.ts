import { Routes } from '@angular/router';
import { AdminUserGuard } from '../guards/admin-user.guard';
import { StoreManagerGuard } from '../guards/store.manager.guard';
import { OrdersComponent } from './orders/orders.component';

import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminUserGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [StoreManagerGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [StoreManagerGuard],
    children: [
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
]