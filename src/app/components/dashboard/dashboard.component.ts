import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  prodoucts$!: Observable<IProduct[]>
  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this.prodoucts$ = this.productsService.getAllProducts();
  }

}
