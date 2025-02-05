import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CycleSchedulePageRoutingModule } from './cycle-schedule-routing.module';
import { CycleScheduleComponent } from './cycle-schedule.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CycleSchedulePageRoutingModule
    ],
    declarations: [
        CycleScheduleComponent
    ]
})
export class CycleScheduleModule { }
