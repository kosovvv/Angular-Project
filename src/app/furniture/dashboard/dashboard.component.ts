import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/IProduct';

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
