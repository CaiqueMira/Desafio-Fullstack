import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from './components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
