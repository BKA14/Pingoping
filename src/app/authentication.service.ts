// authentication.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

nom:any;
prenom1:any;
iduser: any;
numuser: any;
grade: any;

constructor(private router: Router)
{
  this.getsession();

}

  async ngOnInit() {
 await this.getsession();
}


async getsession(){

this.grade= (localStorage.getItem('grade'));
console.log(this.grade);

this.prenom1= (localStorage.getItem('prenom1'));
console.log(this.prenom1);

this.iduser= (localStorage.getItem('iduser'));
console.log(this.iduser);

this.numuser= (localStorage.getItem('numuser'));
console.log(this.numuser);

  }


canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  // Vérifiez ici si l'utilisateur est connecté
  // Si l'utilisateur est connecté, retournez true pour autoriser l'accès à la route

  if ( this.grade !== undefined && this.grade !== null && this.prenom1 !== undefined && this.prenom1 !== null && this.numuser !== undefined && this.numuser !== null && this.iduser !== undefined && this.iduser !== null && this.grade !== '' && this.grade !== '' && this.prenom1 !== '' && this.prenom1 !== '' && this.numuser !== '' && this.numuser !== '' && this.iduser !== '' && this.iduser !== '') {
    return true;
  } else {
    this.router.navigate(['/login2']);
    return false;
  }
}
}
