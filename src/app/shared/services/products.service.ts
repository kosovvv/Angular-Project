import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { AuthService } from './auth-service.service';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  currentUser!: IUser | null;
  

  getAllProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3030/data/catalog').pipe(
      shareReplay()
    )
  }

  getMyProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${this.currentUser?._id}%22`).pipe(
      shareReplay()
    )
  }

  createProduct(product:IProduct) : Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:3030/data/catalog', product).pipe(
      shareReplay()
    )
  }

  getProductById(id : string) : Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3030/data/catalog/${id}`).pipe(
      shareReplay()
    )
  }

  editProductById(id : string, product: IProduct) : Observable<IProduct>  {
    return this.http.put<IProduct>(`http://localhost:3030/data/catalog/${id}`,product).pipe(
      shareReplay()
    )
  }

  deleteProductById(id : string) : Observable<any> {
    return this.http.delete<IProduct>(`http://localhost:3030/data/catalog/${id}`).pipe(
      shareReplay()
    )
  }
}
