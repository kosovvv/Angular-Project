import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LikeService } from "../services/like-service";
import { ILike } from "../models/ILike";

@Injectable()

export class LikeCountResolver implements Resolve<ILike[]> {
    constructor(private likesService:LikeService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILike[]> {
        const productId = route.paramMap.get('id');
        return this.likesService.getLikesByProduct(productId as string);
    }
}