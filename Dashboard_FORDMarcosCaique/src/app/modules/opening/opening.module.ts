import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningComponent } from './opening/opening.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    OpeningComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    OpeningRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class OpeningModule { }
