import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Http, Headers, RequestOptions, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import {JwtHelper} from 'angular2-jwt';
import {User} from '../model/user.model';
//let jwtHelper = new JwtHelper();

@Injectable()
export class Auth {
  constructor(private http: Http, private router: Router) { }

  login(body: string) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:8080/user/authenticate', body, new RequestOptions({ headers: headers }))
      .map((res: Response) => {
        // this.userSession.setJwtToken(res.headers.get('Authorization'));
        localStorage.setItem('jwt', res.headers.get('Authorization'));
        return res.json();
      })
  }

  logout() { localStorage.removeItem('jwt'); }

  loggedIn() {
    // jwtHelper + vérif du token à la place de ça qui ne semble pas foncitonner
    // ou alors faut ajouter aussi ici les infos sur le jeton ???
    return tokenNotExpired("jwt");
  }

  getConnectedUser() {
    let j = localStorage.getItem('user');
    if (j != null) {
      return JSON.parse(j);
    }
    return {
      "id": 0,
      "nom": "unknow",
      "prenom": "unknow",
      "pseudo": "unknow",
      "email": "osef@mail.com"
    };
  }

  isAdmin(){
    return this.getConnectedUser().isAdmin;
  }
}


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) { }

  canActivate() {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
