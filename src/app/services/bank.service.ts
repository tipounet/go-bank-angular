import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import {Bank} from '../model/bank.model';
@Injectable()
export class BankService {

  banks: Bank[] = [];

  constructor(private authHttp: AuthHttp) { }

  getAll() {
    return this.authHttp.get("http://localhost:8080/bank")
      .map((res: Response) => res.json());
  }

}
