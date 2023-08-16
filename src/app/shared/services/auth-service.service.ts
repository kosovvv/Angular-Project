import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';
import { Observable, map, BehaviorSubject, tap, shareReplay } from 'rxjs';
import { host } from '../constantes/constants';

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private subject = new BehaviorSubject<IUser | null>(null);

  user$: Observable<IUser | null> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);

    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  register(email: string, password: string ): Observable<any> {
    return this.http.post<IUser>('http://localhost:3030/users/register', {email, password}).pipe(
      tap(user => {
        this.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    )
  }

  getUserByEmail(email:string) : Observable<boolean> {
    const encodedEmail = btoa(email);
    return this.http.get<boolean>(`http://localhost:3030/users/${encodedEmail}`);
  }


  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(host + '/users/login', {email, password}).pipe(
      tap(user => {
        this.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    )
  }

  logout(): Observable<unknown> {
    return this.http.get<IUser>("http://localhost:3030/users/logout").pipe(
      tap(() => {
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
      })
    );
  }

}
