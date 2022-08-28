import { SignupService } from './signup.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, first, map, switchMap } from 'rxjs';

const WAIT_TYPING = 350

@Injectable({
  providedIn: 'root'
})
export class ExistingUserService {

  constructor(private signupService: SignupService) { }

  existingUser() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(WAIT_TYPING),
        filter((typedValue) => typedValue.length >= 5),
        distinctUntilChanged(),
        switchMap((typedValue) => {
          console.log(typedValue)
          return this.signupService.existingUser(typedValue)
        }),
        map((userExists) => {
          console.log(userExists)
          return userExists.name ? { existingUser: true } : null
        }),
        first()
      )
    }
  }
}
