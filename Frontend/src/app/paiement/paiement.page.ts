import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {
  userData: any;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  )
   {

   }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
      console.log('nom 2: ', this.userData );
    });
    console.log('nom 1: ', this.userData);

    // pour initialiser les notiications push
    this.notificationService.initializePushNotifications();
  }





}
