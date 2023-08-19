import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/models/IProduct';
import { IUser } from 'src/app/shared/models/IUser';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  currentUser!:IUser | null
  constructor(private productsService : ProductsService, private authService:AuthService, private router : Router) {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formValue : any) {
    const product : IProduct = {
      _id: null as any,
      make: formValue.controls.make.value,
      model: formValue.controls.model.value,
      year: formValue.controls.year.value,
      description: formValue.controls.description.value,
      price: formValue.controls.price.value,
      img: formValue.controls.img.value,
      material: formValue.controls.material.value,
      _ownerId: this.currentUser?._id || null
  };
    this.productsService.createProduct(product).subscribe(() => {
      this.router.navigate(['/furniture']);
    })
  }
}
