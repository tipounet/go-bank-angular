import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ConfigurationProvider} from '../providers/configuration.provider';
import {AccountService} from '../services/account.service';
import {BankService} from '../services/bank.service';
import {UserService} from '../services/user.service';
import {Auth} from '../services/Auth.Service';
import {Account} from '../model/account.model';
import {User} from '../model/user.model';
import {Bank} from '../model/bank.model';


// est ce que l'on peu déléguer tous cela au service home ? (injecter dans un injectable ?)
@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html',
  providers: [AccountService, BankService, UserService, Auth, ConfigurationProvider]
})
export class Home implements OnInit {
  // est ce que l'on est obligé d'avoir tous ça ? non on peux direct taper sur une méthode
  listAccount: Account[];
  listBank: Bank[];
  // le compte utilisé par le formulaire d'ajout
  account: Account;
  constructor(private accountService: AccountService, private bankService: BankService, private userService: UserService, private auth: Auth) {
    this.initFormAccount();
    this.account.user = auth.getConnectedUser();
  }

  ngOnInit() {
    this.accountService.getAccountForUser(this.auth.getConnectedUser()).subscribe(
      data => {
        this.listAccount = data;
        return true;
      },
      error => {
        console.log("Erreur lors de la récupération liste des comptes de l'utilisateur courant ! ", error);
        return Observable.throw(error);
      }
    );

    this.bankService.getAll().subscribe(data => {
      this.listBank = data;
      return true;
    },
      error => {
        console.log("Erreur récupération de la liste des banques !", error);
        return Observable.throw(error);
      });
  }
  private initFormAccount() {
    this.account = new Account(0, null, new User(), new Bank());;
  }

  getBankByName(name: string) {
    for (let i = 0; i < this.listBank.length; i++) {
      let b = this.listBank[i];
      if (b.name == name) {
        return b;
      }
    }
  }
  onSubmit() {
    console.log('aller op on ajoute le bazar', this.account);
    let a = this.account;
    a.userid = this.account.user.id;
    a.bankid = this.getBankByName(this.account.bank.name).id;
    this.accountService.saveNew(a).subscribe((data) => {
      console.log('le formulaire à été posté et ça c\'est le retour de la requete', data);
      this.listAccount.push(data);
      this.initFormAccount();
    },
      error => {
        // FIXME : comment je peux faire pour avoir le contenu du corps de la requete ?
        console.log("Erreur : ", error);
      });
  }

  addAccount(accountNumber: string) {
    let account = new Account(42, accountNumber, null, null);
    this.listAccount.push(account);
  }

  isLoggedIn() {
    return this.auth.loggedIn();
  }

  getUserName() {
    let user = this.auth.getConnectedUser();
    return user.prenom;
  }
  userIsAdmin() {
    return this.auth.isAdmin();
  }
}
