import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DetailsComponent } from './components/furniture/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CartItemComponent } from './components/furniture/cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CommentsComponent } from './components/furniture/comments/comments.component';
import { EditComponent } from './components/furniture/edit/edit.component';
import { MyFurnitureComponent } from './components/furniture/my-furniture/my-furniture.component';
import { CreateComponent } from './components/furniture/create/create.component';
import { DashboardComponent } from './components/furniture/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { CreateCommentComponent } from './components/furniture/create-comment/create-comment.component';
import { FurnitureModule } from './components/furniture/furniture.module';
import { ProductDetailsResolver } from './shared/resolvers/details.resolver';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { LikeCountResolver } from './shared/resolvers/like-count-resolver';
import { isLikedResolver } from './shared/resolvers/is-liked-resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
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
    ProductDetailsResolver,
    CommentsResolver,
    LikeCountResolver,
    isLikedResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
