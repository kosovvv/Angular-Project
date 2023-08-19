import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { IComment } from 'src/app/shared/models/IComment';
import { ILike } from 'src/app/shared/models/ILike';
import { IProduct } from 'src/app/shared/models/IProduct';
import { IUser } from 'src/app/shared/models/IUser';

import { AuthService } from 'src/app/shared/services/auth-service.service';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { LikeService } from 'src/app/shared/services/like-service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user!: IUser | null
  product!: Observable<IProduct>
  comments!: Observable<IComment[] | null>;
  isAuthor!: boolean;
  isLiked!: Observable<boolean>
  likes!: number;
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private commentsService: CommentsService,
    private likesService: LikeService
  ) { }

  ngOnInit(): void {
    this.product = this.route.data.pipe(
      map(item => item['products']),
      tap(product => {
        this.isAuthor = this.user?._id == product._ownerId
      }),
    )
    this.comments = this.route.data.pipe(
      map(item => item['comments'])
    )
    this.isLiked = this.route.data.pipe(
      map(item => item['isLiked'])
    )
    this.authService.user$.subscribe((user) => {
      this.user = user;
    })
    this.updateLikeCount();
  }

  onDelete() {
    this.product.pipe(
      switchMap(product => {
        if (product && product._ownerId == this.user?._id) return this.productService.deleteProductById(product._id)
        else return of(null);
      })
    ).subscribe(() => {
      this.router.navigate(['/furniture'])
    })
  }

  updateLikeCount() {
    this.product.pipe(
      switchMap(product => {
        return this.likesService.getLikesByProduct(product._id)
      })
    ).subscribe((arrayLikes) => this.likes = arrayLikes.length)
  }
  updateLike() {
    this.isLiked = this.product.pipe(
      switchMap(product => {
        return this.likesService.hasAuthorLikedItem(product._id)
      })
    )
    this.updateLikeCount();
  }

  onLike() {
    this.product.pipe(
      switchMap(product => {
        const like:ILike = {
          _id : null as any,
          authorId: this.user?._id as any,
          authorName: this.user?.email as any,
          itemId: product._id
        }
        return this.likesService.createLike(like);
      })
    ).subscribe(() => {
      this.updateLike();
    });
  }
  onUnlike() {
    this.product.pipe(
      switchMap(product => {
        return this.likesService.deleteCommentById(product._id);
      })
    ).subscribe(() => {
      this.updateLike()
    });
  }

  customEventHandler(event: string) {
    this.product.pipe(
      switchMap((product) => {
        if (product) {
          const comment: IComment = {
            _id: null as any,
            authorId: this.user?._id as any,
            authorName: this.user?.email as any,
            itemId: product._id,
            description: event,
            createdAt: new Date().toString(),
          };
          return this.commentsService.createComment(comment).pipe(
            switchMap(() => {
              return this.commentsService.getCommentsByProduct(product._id);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe((updatedComments) => {
      if (updatedComments) {
        this.comments = of(updatedComments);
      }
    });
  }
  onCommentDelete(event : boolean) {
    this.product.pipe(
      switchMap((product) => {
        return this.commentsService.getCommentsByProduct(product._id)
      })
    ).subscribe(updatedComments => {
        this.comments = of(updatedComments);
    })
  }
}
