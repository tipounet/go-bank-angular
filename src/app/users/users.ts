import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from '../model/user.model';
import {UserService} from '../services/user.service';
import {Auth} from '../services/Auth.Service';
import {ConfigurationProvider} from '../providers/configuration.provider';

@Component({
  selector: 'users',
  styleUrls: ['./users.css'],
  templateUrl: './users.html',
  providers: [UserService, Auth, ConfigurationProvider]
})
export class Users implements OnInit {
  // utilisateur pour le formulaire
  user = new User(0);
  userList: User[];

  constructor(private userService: UserService, private auth: Auth) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        this.userList = data;
        return true;
      },
      error => {
        console.log("Erreur lors de la récupération liste des utilisateurs. ", error);
        return Observable.throw(error);
      });
  }

  newUser() {
    this.user = new User(0);
  }

  // retourne un utilisateur de la liste à partir de son ID.
  // La liste est chargée avec le composant
  private getUserById(userid: number) {
    let retour: User;
    this.userList.forEach(function(current) {
      if (current != null && current.id == userid) {
        retour = current;
        return false;
      }
    })
    // FIXME : typescript iterator ???
    // for (let i = 0; this.userList.size < i; i++) {
    //   let current = this.userList[i];
    //   if (current != null && current.id == userid) {
    //     retour = current;
    //     break;
    //   }
    // }
    return retour;
  }
}
