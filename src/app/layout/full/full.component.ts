import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { CustoMenuItem } from 'src/app/models/CustomMenuItem';
import { AuthService } from 'src/app/services/auth.service';
import { menuItems } from './menu';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html'
})
export class FullComponent implements OnInit {

  items: MenuItem[] = menuItems;
  loggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user?.userData) {
        this.loggedIn = true;
      }
      this.items = this.items.filter((item: CustoMenuItem) => {
        if (!item.roles)
          return item
        else
          return item.roles.some((role: string) => {
            return user?.userData.roles.includes(role);
          });
      });
    });
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }

}
