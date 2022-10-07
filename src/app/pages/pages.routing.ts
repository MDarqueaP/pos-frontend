import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './not-found/not-found.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  }
];