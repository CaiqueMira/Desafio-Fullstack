import { User } from '../../../shared/models/user/user.model';
import { environment } from 'src/environments/environment';
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
