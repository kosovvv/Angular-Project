import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "../services/auth-service.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user$.pipe(
            take(1),
            map(user => {
                const loginRequired = route.data['loginRequired'];
                if (loginRequired === undefined || !!user === loginRequired) { return true; }
                const returnUrl = route.url.map(u => u.path).join('/');
                return !!user ?
                    this.router.createUrlTree(['/furniture'], { queryParams: { returnUrl } }) :
                    this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl } });
            })
        );
    }
}
