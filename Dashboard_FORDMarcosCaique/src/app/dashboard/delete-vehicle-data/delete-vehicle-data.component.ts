import { Router } from '@angular/router';
import { VehicleData } from '../interfaces/vehicleData.model';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { VehiclesData } from '../interfaces/vehicleData.model';

const WAIT_TYPING = 350

@Component({
  selector: 'app-delete-vehicle-data',
  templateUrl: './delete-vehicle-data.component.html',
  styleUrls: ['./delete-vehicle-data.component.css']
})
export class DeleteVehicleDataComponent implements OnInit {
  deleteVehicleDataForm!: FormGroup
  vehicleData!: VehicleData | undefined

  faAngleLeft = faAngleLeft

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private router: Router) { }

  verifyVehicleData(arrayDatas: VehiclesData) {
    console.log(...arrayDatas)
    if(arrayDatas.length == 1) {
      this.vehicleData = arrayDatas.shift()

      this.deleteVehicleDataForm.patchValue(
        {
          odometer: this.vehicleData?.odometer, tirePressure: this.vehicleData?.tirePressure,
          status: this.vehicleData?.status,
          batteryStatus: this.vehicleData?.batteryStatus,
          fuelLevel: this.vehicleData?.fuelLevel,
          latitude: this.vehicleData?.latitude,
          longitude: this.vehicleData?.longitude
        })
    }
    else {
      this.vehicleData = undefined
      this.deleteVehicleDataForm.markAsPristine()
    }
  }

  remove() {
    if(this.vehicleData != undefined && confirm('Deseja remover o dado do veículo de código vin "' + this.vehicleData.vin + '"?' ) && this.deleteVehicleDataForm.valid) {
      this.dashboardService.removeVehicleData(this.vehicleData.id ? this.vehicleData.id : 0).subscribe(
        {
          next: (value) => {
            console.log(value)
            this.router.navigate(['/dashboard'])
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
    }
  }

  ngOnInit(): void {
    this.deleteVehicleDataForm = this.formBuilder.group( {
      vin: ['', [
        Validators.required,
      ]],
      odometer: ['', [
        Validators.required
      ]],
      tirePressure: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      batteryStatus: ['', [
        Validators.required
      ]],
      fuelLevel: ['', [
        Validators.required
      ]],
      latitude: ['', [
        Validators.required
      ]],
      longitude: ['', [
        Validators.required
      ]]
    })

    this.deleteVehicleDataForm
      .get('vin')
      ?.valueChanges.pipe(
        debounceTime(WAIT_TYPING),
        filter((typedValue) => typedValue.length >= 17),
        distinctUntilChanged(),
        switchMap((typedValue) =>
          this.dashboardService.getVehicleData(typedValue)
        )
      )
      .subscribe({
        next: (arrayDatas) => {
          this.verifyVehicleData(arrayDatas);
        },
        error: (error) => console.log(error),
      });
  }



}
