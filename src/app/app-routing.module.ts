import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateComponent } from './components/create/create.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyFurnitureComponent } from './components/my-furniture/my-furniture.component';
import { ProductDetailsResolver } from './resolvers/details.resolver';
import { CommentsResolver } from './resolvers/comments.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    resolve: {
      products: ProductDetailsResolver,
      comments: CommentsResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      products: ProductDetailsResolver
    }
  },
  {
    path: 'my-furniture',
    component: MyFurnitureComponent
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
    ProductDetailsResolver,
    CommentsResolver
  ]
})
export class AppRoutingModule { }
