import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { User } from 'src/app/models/User';
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class StoreManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  roles: string[] = ['SUPERADMIN', 'STORE_MANAGER'];

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user: User | null) => {
        if (this.roles.some((role: string) => user?.userData?.roles?.includes(role))) {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }
}