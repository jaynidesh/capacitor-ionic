import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { CycleManagementComponent } from './cycle-management/cycle-management.component';

const routes: Routes = [
  {
    path: '',
    component: CycleManagementComponent
  },
  {
    path: 'users',
    component: UserManagementComponent
  },
  {
    path: 'cycle-managament',
    component: CycleManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
