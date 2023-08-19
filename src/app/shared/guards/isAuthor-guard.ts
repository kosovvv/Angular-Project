import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, switchMap, of, take } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { ProductsService } from "../services/products.service";
import { IUser } from "../models/IUser";

@Injectable({
    providedIn: 'root'
})

export class isAuthorGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService, private productService: ProductsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const productId = route.url.map(u => u.path)[1];
        return this.authService.user$.pipe(
            take(1),
            switchMap((user: IUser | null) => {
                if (!user) {
                    return of(false);
                }
                return this.productService.getProductById(productId).pipe(
                    map(product => product._ownerId === user._id)
                );
            })
        );
    }
}
