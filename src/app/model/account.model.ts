import {User} from '../model/user.model.ts';
import {Bank} from '../model/bank.model.ts';

export class Account {
  id: number;
  number: string;
  user: User;
  bank: Bank;
  // A cause de ce putain d'orm de merde en go :'(
  userid: number;
  bankid: number;

  constructor(id?: number, number?: string, user?: User, bank?: Bank) {
    this.id = id;
    this.number = number;
    this.user = user;
    this.bank = bank;
  }
}
