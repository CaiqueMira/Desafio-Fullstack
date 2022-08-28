import { AbstractControl } from "@angular/forms";

export class CustomValidator {

  static lowerCase(control: AbstractControl) {
    const value = control.value
    if(value !== value.toLowerCase()) {
      return { smallLetter: true }
    }
    return null
  }

  static twentyCharacters(control: AbstractControl) {
    const value = control.value
    if(value.length != 20) {
      return { numberCharacters: true }
    }
    return null
  }

}
