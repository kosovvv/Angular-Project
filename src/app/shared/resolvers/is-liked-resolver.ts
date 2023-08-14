import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LikeService } from "../services/like-service";

@Injectable()

export class isLikedResolver implements Resolve<boolean> {
    constructor(private likesService:LikeService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const productId = route.paramMap.get('id');
        return this.likesService.hasAuthorLikedItem(productId as string);
    }
}