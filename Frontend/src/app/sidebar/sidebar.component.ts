import { authService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationBadgeService } from '../notification-badge.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  grade: any;
  userData: any;
  unreadCount: number = 0;

  constructor(
    private router: Router,
    private notificationBadgeService : NotificationBadgeService,
    private authService : authService
  )
  {

  }

  ngOnInit() {

    this.notificationBadgeService.unreadCount$.subscribe((count) => {
      this.unreadCount = count;
    });
  console.log('non lu', this.unreadCount);
  // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

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

  openNotifications() {

    this.router.navigateByUrl('/notifications');

  }

}
