import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "../models/IProduct";
import { ProductsService } from "../services/products.service";
import { Observable } from "rxjs";

@Injectable()

export class ProductDetailsResolver implements Resolve<IProduct> {
    constructor(private productsService:ProductsService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        const productId = route.paramMap.get('id');
        return this.productsService.getProductById(productId as string);
    }
}