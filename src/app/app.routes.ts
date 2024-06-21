import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/view/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent //Here put the landing component
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }