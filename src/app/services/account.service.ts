import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import {ConfigurationProvider} from '../providers/configuration.provider';
import {Account} from '../model/account.model';
import {User} from '../model/user.model';

@Injectable()
export class AccountService {

  accounts = [];

  constructor(private authHttp: AuthHttp, private conf : ConfigurationProvider) { }

  getAccountForUser(u: User) {
    return this.authHttp.get(this.conf.getUrlService() + 'account/user/' + u.id)
      .map((res: Response) => {
        return res.json();
      });
  }

  saveNew(a: Account) {
    console.log('AccountService.saveNew ', a);
    return this.authHttp.post(this.conf.getUrlService() + 'account', JSON.stringify(a))
      .map((res: Response) => res.json());
  }
}
