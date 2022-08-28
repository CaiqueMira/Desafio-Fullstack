import { Router } from '@angular/router';
import { User } from 'src/app/opening/login/interfaces/user.model';
import { ExistingUserService } from './existing-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidator } from './form.validator';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUserForm!: FormGroup

  constructor(private signupService: SignupService, private formBuilder: FormBuilder, private existingUserService: ExistingUserService, private router: Router) { }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group( {
      name: ['', [
        Validators.required,
        Validators.minLength,
        CustomValidator.lowerCase
      ], [
        this.existingUserService.existingUser()
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]]
    })
  }

  signup() {
    if(!this.newUserForm.get('name')?.errors?.['required'] ||
    !this.newUserForm.get('name')?.errors?.['minlength'] ||
    !this.newUserForm.get('name')?.errors?.['smallLetter'] ||
    !this.newUserForm.get('name')?.errors?.['existingUser'] ||
    !this.newUserForm.get('email')?.errors?.['required'] ||
    !this.newUserForm.get('email')?.errors?.['email'] ||
    !this.newUserForm.get('fullName')?.errors?.['required'] ||
    !this.newUserForm.get('password')?.errors?.['required']) {
      const newUser = this.newUserForm.getRawValue() as User
      console.log(newUser)
      this.signupService.register(newUser).subscribe(
        {
          next: (user) => {
            this.router.navigate(['/opening'])
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
    }
  }
}
