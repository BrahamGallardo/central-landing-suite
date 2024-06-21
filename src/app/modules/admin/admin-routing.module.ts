import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticatedGuard } from '../../core/guards/authenticated.guard';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authenticatedGuard],
    pathMatch: 'full',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
