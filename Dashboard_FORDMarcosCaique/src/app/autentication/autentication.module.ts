import { AutenticationInterceptor } from './autentication.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticationInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule
  ]
})
export class AutenticationModule { }
