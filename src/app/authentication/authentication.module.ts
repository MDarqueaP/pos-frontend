import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthenticationRoutes } from './authentication.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(AuthenticationRoutes),
    SharedModule
  ]
})
export class AuthenticationModule { }
