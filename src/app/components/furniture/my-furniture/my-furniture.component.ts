import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/IProduct';

import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {

  products$!: Observable<IProduct[]>
  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getMyProducts();
  }

}
