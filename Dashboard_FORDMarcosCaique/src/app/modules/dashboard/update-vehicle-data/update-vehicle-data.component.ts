import { Router } from '@angular/router';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, filter, switchMap, map } from 'rxjs';
import { VehicleData, VehiclesData } from '../../../shared/models/vehicleData/vehicleData.model';

const WAIT_TYPING = 350

@Component({
  selector: 'app-update-vehicle-data',
  templateUrl: './update-vehicle-data.component.html',
  styleUrls: ['./update-vehicle-data.component.css']
})
export class UpdateVehicleDataComponent implements OnInit {
  updateVehicleDataForm!: FormGroup
  vehicleData!: VehicleData | undefined

  faAngleLeft = faAngleLeft

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private router: Router) { }

  verifyVehicleData(arrayDatas: VehiclesData) {
    console.log(...arrayDatas)
    if(arrayDatas.length == 1) {
      this.vehicleData = arrayDatas.shift()

      this.updateVehicleDataForm.patchValue(
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
      this.updateVehicleDataForm.markAsPristine()
    }
  }

  update() {
    if(this.vehicleData != undefined && confirm('Deseja atualizar o dado de veículo de código vin "' + this.vehicleData.vin + '"?') && this.updateVehicleDataForm.valid) {
      this.updateVehicleDataForm.patchValue(
        {
          vin: this.vehicleData.vin
        }
      )
      const data = this.updateVehicleDataForm.getRawValue() as VehicleData
      this.dashboardService.updateVehicleData(this.vehicleData.id, data).subscribe(
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
    this.updateVehicleDataForm = this.formBuilder.group( {
      vin: [''],
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

    this.updateVehicleDataForm
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
