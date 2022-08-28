import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from './../components/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { SharedModule } from '../shared/shared.module';
import { AddVehicleDataComponent } from './add-vehicle-data/add-vehicle-data.component';
import { UpdateVehicleDataComponent } from './update-vehicle-data/update-vehicle-data.component';
import { DeleteVehicleDataComponent } from './delete-vehicle-data/delete-vehicle-data.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AddVehicleDataComponent,
    UpdateVehicleDataComponent,
    DeleteVehicleDataComponent,
    DashboardInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
