import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import {User} from '../model/user.model';
import {AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';
import {Auth} from '../services/Auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.html'
  // providers: [UserService]
})
// page par défaut si on est pas connecté})
export class Login {
  private user = new User(0);

  constructor(private router: Router, private auth: Auth) {
  }

  login() {
    let body = JSON.stringify(this.user);

    this.auth.login(body).subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.goHome();
        return true;
      },
      error => {
        console.error("Error connexion ", error);
        return Observable.throw(error);
      })
  }

  goHome() {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
