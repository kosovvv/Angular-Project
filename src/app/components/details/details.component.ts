import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { IComment } from 'src/app/models/IComment';
import { IProduct } from 'src/app/models/IProduct';
import { IUser } from 'src/app/models/IUser';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user!: IUser | null
  product!: Observable<IProduct>
  comments!: Observable<IComment[] | null>;
  
  constructor(
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    this.product = this.route.data.pipe(
      map(item => item['products']),
    )
    this.comments = this.route.data.pipe(
      map(item => item['comments'])
    )

    this.authService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  reloadComments(): void {
    this.comments = this.route.data.pipe(
      map(item => item['comments'])
    )
  }

  onDelete() {
    this.product.pipe(
      switchMap(product => {
        if (product) return this.productService.deleteProductById(product._id)
        else return of(null);
      })
    ).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  onLike() {
    // Add your like functionality here
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
            createdAt: new Date(),
          };
          return this.commentsService.createComment(comment).pipe(
            switchMap(() => {
              // Fetch the updated comments list after adding a new comment
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
