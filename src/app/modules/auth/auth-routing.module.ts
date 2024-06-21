import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unauthenticatedGuard } from '../../core/guards/unauthenticated.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [unauthenticatedGuard],
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
