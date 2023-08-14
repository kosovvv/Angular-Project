import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { IProduct } from 'src/app/shared/models/IProduct';
import { IUser } from 'src/app/shared/models/IUser';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentUser!:IUser | null
  product!: Observable<IProduct> 
  constructor(private route: ActivatedRoute,private productService: ProductsService, private router: Router, private authService: AuthServiceService) {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    })
   }

  ngOnInit(): void {
    this.product = this.route.data.pipe(
      map(item => item['products'])
    )
  }
  onSubmit(formValue : any) {
    const product = {
      make: formValue.make,
      model: formValue.model,
      year: formValue.year,
      description: formValue.description,
      price: formValue.price,
      img: formValue.img,
      material: formValue.material,
      _ownerId: this.currentUser?._id || null
  };
    
    this.product.pipe(
      switchMap(product => {
        if (product) return this.productService.editProductById(product._id, product)
        else return of(null);
      })
    ).subscribe(() => {
      this.router.navigate(['/furniture']);
    })
  }
}
