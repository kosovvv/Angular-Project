import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "../models/IProduct";
import { ProductsService } from "../services/products.service";
import { Observable } from "rxjs";
import { CommentsService } from "../services/comments.service";
import { IComment } from "../models/IComment";

@Injectable()

export class CommentsResolver implements Resolve<IComment[]> {
    constructor(private commentsService:CommentsService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IComment[]> {
        const productId = route.paramMap.get('id');
        return this.commentsService.getCommentsByProduct(productId as string);
    }
}