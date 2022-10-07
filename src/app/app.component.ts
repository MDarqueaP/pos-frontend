import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private config: PrimeNGConfig,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.orderService.getOrderOnLoad();
    this.translateService.setDefaultLang('es');
    this.translateService.use(localStorage.getItem('lang') || 'es');
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
