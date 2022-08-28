import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName!: string
  password!: string
  faCircleInfo = faCircleInfo
  faUser = faUser
  faLock = faLock

  faEyeIcon = faEyeSlash

  inputType = 'password'
  passwordHide = true


  constructor(private authService: AuthenticationService, private router: Router) { }

  // Realiza a autenticação do usuário
  login() {
    this.authService.login(this.userName, this.password).subscribe(
      {
        next: () => {
          this.router.navigate(['home'])

        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  //
  passwordInputTypeToggle() {
    this.passwordHide = !this.passwordHide
    if(this.passwordHide) {
      this.inputType = 'password'
      this.faEyeIcon = faEyeSlash
    }
    else {
      this.inputType = 'text'
      this.faEyeIcon = faEye
    }
  }

}
