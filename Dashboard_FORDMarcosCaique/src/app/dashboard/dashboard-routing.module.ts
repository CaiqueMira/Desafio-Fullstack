
import { DeleteVehicleDataComponent } from './delete-vehicle-data/delete-vehicle-data.component';
import { UpdateVehicleDataComponent } from './update-vehicle-data/update-vehicle-data.component';
import { AddVehicleDataComponent } from './add-vehicle-data/add-vehicle-data.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardInfoComponent
      },
      {
        path: 'add',
        component: AddVehicleDataComponent
      },
      {
        path: 'update',
        component: UpdateVehicleDataComponent
      },
      {
        path: 'delete',
        component: DeleteVehicleDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
