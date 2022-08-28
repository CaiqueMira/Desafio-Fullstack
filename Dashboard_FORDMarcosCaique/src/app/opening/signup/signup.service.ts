import { User } from './../login/interfaces/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

const API = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  existingUser(name: string): Observable<User> {
    return this.httpClient.get(`${API}/user/exists/${name}`)
  }

  register(newUser: User): Observable<User> {
    return this.httpClient.post(`${API}/user/signup`, newUser)
  }
}
