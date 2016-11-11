/**
 * Un utilisateur vindiou !!!!
**/
export class User {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  pwd: string;
  isAdmin: boolean;
  // TODO  : polypophisme ???
  constructor(id?: number, nom?: string, prenom?: string, pseudo?: string, email?: string, pwd?: string, ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.pseudo = pseudo;
    this.email = email;
    this.pwd = pwd;
    this.isAdmin=false;
  }
}
