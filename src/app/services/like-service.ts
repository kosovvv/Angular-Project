import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILike } from "../models/ILike";
import { Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LikeService {
    constructor(private http: HttpClient) { }

    createLike(like: ILike) {
        return this.http.post(`http://localhost:3030/data/likes/`, like)
    }

    getLikesByProduct(productId: string): Observable<ILike[]> {
        return this.http.get<ILike[]>(`http://localhost:3030/data/likes/${productId}`).pipe(
            shareReplay()
        );
    }

    getLikesByUser(userId: string): Observable<ILike[]> {
        return this.http.get<ILike[]>(`http://localhost:3030/data/likes?where=_ownerId%3D%22${userId}%22`).pipe(
            shareReplay()
        )
    }
    deleteCommentById(productId:string): Observable<any> {
        return this.http.delete<ILike>(`http://localhost:3030/data/likes/${productId}`).pipe(
            shareReplay()
        )
    }

    hasAuthorLikedItem(productId:string) {
        return this.http.get<boolean>(`http://localhost:3030/data/likes/isliked/${productId}`)
    }


}