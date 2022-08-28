import { HomeGuard } from './core/guards//home/home.guard';
import { LoginGuard } from './core/guards/login/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'opening',
    pathMatch: 'full'
  },
  {
    path: 'opening',
    loadChildren: () => import('./modules/opening/opening.module').then((module) => module.OpeningModule),
    //canLoad: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((module) => module.HomeModule),
    //canLoad: [HomeGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((module) => module.DashboardModule),
    //canLoad: [HomeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
