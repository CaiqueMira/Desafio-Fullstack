import { User } from 'src/app/shared/models/user/user.model';
import { TokenService } from '../token/token.service';
import jwt_decode from 'jwt-decode'
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>({})



  constructor(private tokenService: TokenService) {
    if(this.tokenService.hasToken()) {
      this.decodeJWTToken()
    }
   }

  decodeJWTToken() {
    const token = this.tokenService.returnToken()
    const user = jwt_decode(token) as User
    this.userSubject.next(user)
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token)
    this.decodeJWTToken()
  }

  returnUser() {
    return this.userSubject.asObservable()
  }

  logout() {
    this.tokenService.deleteToken()
    this.userSubject.next({})
  }

  isLogged() {
    return this.tokenService.hasToken()
  }
}
