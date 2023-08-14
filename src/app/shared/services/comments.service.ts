import { EventEmitter, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { IComment } from "../models/IComment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CommentsService {

    constructor(private http: HttpClient) { }

    createComment(comment : IComment) {
        return this.http.post(`http://localhost:3030/data/comments/`, comment)
    }

    getCommentsByProduct(productId: string): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3030/data/comments/${productId}`).pipe(
            shareReplay()
        );
    }

    getCommentsByUser(userId : string) : Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3030/data/comments?where=_ownerId%3D%22${userId}%22`).pipe(
            shareReplay()
        )
    }

    editCommentById(commentId : string, comment : IComment  ) : Observable<IComment> {
        return this.http.put<IComment>(`http://localhost:3030/data/comments/${commentId}`, comment ).pipe(
            shareReplay()
        );
    }

    deleteCommentById(commentId:string) : Observable<any> {
        return this.http.delete<IComment>(`http://localhost:3030/data/comments/${commentId}`).pipe(
            shareReplay()
        )
    }

}