import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from '../admin-routing.module';
import { UserManagementComponent } from './user-management.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminRoutingModule
    ],
    declarations: [
        UserManagementComponent
    ]
})
export class UserManagementModule { }
