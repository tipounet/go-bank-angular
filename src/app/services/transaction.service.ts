import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import {Account} from '../model/account.model';
import {User} from '../model/user.model';

@Injectable()
export class TransactionService {

  accounts = [];

  constructor(private authHttp: AuthHttp) { }
// FIXME : mettre en configuration l'url de base des services parce que la c'est n'imp de toujorus dupliquer !
  getAccountTransaction(a : Account) {
    return this.authHttp.get('http://localhost:8080/transaction/account/' + u.id)
      .map((res: Response) => {
        return res.json();
      });
  }

  saveNew(a: Account) {
    console.log('AccountService.saveNew ', a);
    return this.authHttp.post('http://localhost:8080/transaction/', JSON.stringify(a))
      .map((res: Response) => res.json());
  }
}
