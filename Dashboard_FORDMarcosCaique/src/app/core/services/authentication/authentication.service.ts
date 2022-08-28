import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private userService: UserService) {}


  login(userName: string, password: string): Observable<any> {
    return this.httpClient.post(`${API}/user/login`, { name: userName, password })
  }

}
