import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/models/IProduct';
import { IUser } from 'src/app/shared/models/IUser';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  currentUser!:IUser | null
  constructor(private productsService : ProductsService, private authService:AuthServiceService, private router : Router) {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
  }
  furniture = {
    make: '',
    model: '',
    year: null,
    description: '',
    price: null,
    img: '',
    material: ''
  };

  onSubmit(formValue : any) {
    // Your form submission logic goes here
    // For example, you can send the form data to a service for processing

    console.log('Form data:', this.furniture);
    const product : IProduct = {
      _id: formValue._id,
      make: formValue.make,
      model: formValue.model,
      year: formValue.year,
      description: formValue.description,
      price: formValue.price,
      img: formValue.img,
      material: formValue.material,
      _ownerId: this.currentUser?._id || null
  };
    this.productsService.createProduct(product).subscribe(() => {
      this.router.navigate(['']);
    })
    // Clear the form after submission
    this.resetForm();
  }
   

  resetForm() {
    this.furniture = {
      make: '',
      model: '',
      year: null,
      description: '',
      price: null,
      img: '',
      material: ''
    };
  }
}
