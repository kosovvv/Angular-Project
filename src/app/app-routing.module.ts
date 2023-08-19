import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      loginRequired: false
    }
  },
  {
    path: 'furniture',
    canActivate: [AuthGuard],
    data: {
      loginRequired: true
    },
    loadChildren: () => import('./furniture/furniture.module').then(m => m.FurnitureModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
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
