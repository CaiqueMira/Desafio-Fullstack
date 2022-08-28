import { Router } from '@angular/router';
import { VehicleData } from '../interfaces/vehicleData.model';
import { ExistingVinService } from './existing-vin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CustomValidator } from 'src/app/opening/signup/form.validator';
import { DashboardService } from '../dashboard.service';

const WAIT_TYPING = 350

@Component({
  selector: 'app-add-vehicle-data',
  templateUrl: './add-vehicle-data.component.html',
  styleUrls: ['./add-vehicle-data.component.css']
})
export class AddVehicleDataComponent implements OnInit {
  addVehicleDataForm!: FormGroup

  faAngleLeft = faAngleLeft

  constructor(private formBuilder: FormBuilder, private existingVinService: ExistingVinService, private dashboardService: DashboardService, private router: Router) { }

  add() {
    if(!this.addVehicleDataForm.get('vin')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('vin')?.errors?.['numberCharacters'] &&
    !this.addVehicleDataForm.get('vin')?.errors?.['existingVINCode'] &&
    !this.addVehicleDataForm.get('odometer')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('tirePressure')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('status')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('batteryStatus')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('fuelLevel')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('latitude')?.errors?.['required'] &&
    !this.addVehicleDataForm.get('longitude')?.errors?.['required']) {
      const data = this.addVehicleDataForm.getRawValue() as VehicleData
      this.dashboardService.addVehicleData(data).subscribe(
        {
          next: (value) => {
            console.log(value)
            this.router.navigate(['/dashboard'])

          }
        }
      )
    }
  }

  ngOnInit(): void {
    this.addVehicleDataForm = this.formBuilder.group( {
      vin: ['', [
        Validators.required,
        CustomValidator.twentyCharacters
      ], [
        this.existingVinService.existingVINCode()
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
  }


}
