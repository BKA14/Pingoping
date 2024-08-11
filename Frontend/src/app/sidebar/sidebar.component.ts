import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  grade: any;

  constructor(
    private router: Router,
  ) {
    this.getsession();
  }

  ngOnInit() {}


  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

  acceuil() {

    this.router.navigateByUrl('/acceuil');

  }

  service() {

    this.router.navigateByUrl('/welcome');

  }

  admin() {

    this.router.navigateByUrl('/admin');

  }


  menu() {

    this.router.navigateByUrl('/menu');

  }

  paiement() {

    this.router.navigateByUrl('/paiement');

  }

}
