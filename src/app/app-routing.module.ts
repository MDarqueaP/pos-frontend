import { Routes } from '@angular/router';
import { AdminUserGuard } from './guards/admin-user.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';
import { StoreManagerGuard } from './guards/store.manager.guard';

import { BlankComponent } from './layout/blank/blank.component';
import { FullComponent } from './layout/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: '',
        loadChildren:
          () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'auth',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
