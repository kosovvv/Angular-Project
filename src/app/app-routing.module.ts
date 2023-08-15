import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DetailsComponent } from './components/furniture/details/details.component';
import { DashboardComponent } from './components/furniture/dashboard/dashboard.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateComponent } from './components/furniture/create/create.component';
import { EditComponent } from './components/furniture/edit/edit.component';
import { MyFurnitureComponent } from './components/furniture/my-furniture/my-furniture.component';
import { ProductDetailsResolver } from './shared/resolvers/details.resolver';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { LikeCountResolver } from './shared/resolvers/like-count-resolver';
import { isLikedResolver } from './shared/resolvers/is-liked-resolver';
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes = [
  //http://localhost:4200/furniture/details/64d624e918d92df2eb1b6f63
  {
    path: 'furniture',
    canActivate: [AuthGuard],
    data: {
      loginRequired: true
    },
    loadChildren: () => import('./components/furniture/furniture.module').then(m => m.FurnitureModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      loginRequired: false
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: {
      loginRequired: true
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      loginRequired: false
    }
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [

  ]
})
export class AppRoutingModule { }
