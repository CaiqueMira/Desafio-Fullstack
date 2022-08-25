import { UserService } from './../../autentication/user/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  user$ = this.userService.returnUser()

  faUser = faUser

  constructor(private router: Router, private userService: UserService) { }


  logout() {
    this.userService.logout()
    this.router.navigate([''])
  }

}
