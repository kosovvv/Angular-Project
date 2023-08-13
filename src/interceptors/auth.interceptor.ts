import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const storage:IUser = JSON.parse(localStorage.getItem('auth_data') as any);

    
    req = req.clone({
      setHeaders: {
        'x-authorization': `${storage.accessToken}`
      }
    });

    return next.handle(req);
  }
}
