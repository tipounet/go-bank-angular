import {Component} from '@angular/core';
import {Auth} from './services/Auth.service';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  // styles:[require('../knacss/knacss.scss')]
  providers: [Auth]
})
export class AppComponent {
  constructor(private auth: Auth) { }

  isLoggedIn() {
    return this.auth.loggedIn();
  }
}
