import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, catchError, of, zip, take, BehaviorSubject, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/models/IUser';
import { API_ERROR } from '../constantes/constants';
import { AuthService } from '../services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor {

  constructor(@Inject(API_ERROR) private apiError: BehaviorSubject<Error | null>, private router:Router, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const storage:IUser = JSON.parse(localStorage.getItem('auth_data') as any);

    if (storage) {
      req = req.clone({
        setHeaders: {
          'x-authorization': `${storage.accessToken}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err => of(err).pipe( 
        switchMap((err) => {
          if (err.status === 401) { return [[err, null]] }
          return zip([err], this.authService.user$).pipe(take(1))
        }),
        switchMap(([err, user]) => {
          if (err.status === 401) {
            if (!user) {
              this.router.navigate(['/auth/login']);
            } else {
              this.router.navigate(['/auth/no-permissions']);
            }
          } else {
            this.apiError.next(err);
            this.router.navigate(['/error']);
          }
          return throwError(() => err);
        })
      ))
    );
  }
}
