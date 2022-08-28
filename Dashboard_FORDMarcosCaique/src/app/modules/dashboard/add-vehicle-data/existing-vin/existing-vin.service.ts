import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, filter, distinctUntilChanged, switchMap, map, first } from 'rxjs';
import { DashboardService } from '../../dashboard.service';


const WAIT_TYPING = 350

@Injectable({
  providedIn: 'root'
})
export class ExistingVinService {

  constructor(private dashboardService: DashboardService) { }

  existingVINCode() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(WAIT_TYPING),
        filter((typedValue) => typedValue.length == 20),
        distinctUntilChanged(),
        switchMap((typedValue) => {
          return this.dashboardService.existingVINCode(typedValue)
        }),
        map((vinCodeExists) => {
          return vinCodeExists ? { existingVINCode: true } : null
        }),
        first()
      )
    }
  }
}
