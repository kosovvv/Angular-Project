import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/shared/interceptors/auth.interceptor';
import { ProductDetailsResolver } from './shared/resolvers/details.resolver';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { LikeCountResolver } from './shared/resolvers/like-count-resolver';
import { isLikedResolver } from './shared/resolvers/is-liked-resolver';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { API_ERROR } from './shared/constantes/constants';
import { BehaviorSubject } from 'rxjs';
import { ErrorComponent } from './core/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: API_ERROR,
      useValue: new BehaviorSubject(null)
    },
    ProductDetailsResolver,
    CommentsResolver,
    LikeCountResolver,
    isLikedResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
