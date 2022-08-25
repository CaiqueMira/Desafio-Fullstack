import { TokenService } from './token/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticationInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.tokenService.hasToken()) {
      const token = this.tokenService.returnToken()
      const headers = new HttpHeaders().append('x-access-token', token)
      request = request.clone({ headers })
    }
    return next.handle(request);
  }
}
