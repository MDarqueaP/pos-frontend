import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { LoadingService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  isRefreshing: boolean = false;

  constructor(
    private loader: LoadingService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();

    const newRequest = this.addTokenInHeader(request);

    return next.handle(newRequest).pipe(
      finalize(() => {
        this.loader.hide();
      })
    );
  }

  private addTokenInHeader(request: HttpRequest<any>): HttpRequest<any> {

    const token = this.authService.user.value?.token;

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    
    return request.clone({ headers });
  }

}
