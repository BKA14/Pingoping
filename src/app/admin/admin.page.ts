import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signalement() {

    this.router.navigateByUrl('/signalement');

  }


  refreshPage(e){
    setTimeout(() => {

      console.log('rafraichissement de la page');
      e.target.complete();
    },500);
    }
}
