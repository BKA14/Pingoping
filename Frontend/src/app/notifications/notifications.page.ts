import { timeService } from './../timeservice.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationBadgeService } from '../notification-badge.service';
import { authService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  unreadCount = 0;
  notifications : any;
  userData: any;
  updateSubscription: Subscription;
  serverTime: string | number | Date;


  constructor(
    private notificationBadgeService: NotificationBadgeService,
    private authService: authService,
    private navCtrl: NavController,
     private router: Router,
     public _apiService: ApiService,
     private cdr: ChangeDetectorRef,
     private timeService: timeService

  ) {}


  ngOnInit() {

    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });

    // Écouter les changements du compteur de notifications non lues
    this.notificationBadgeService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    this.loadUnreadNotifications();

    this.updateSubscription = interval(10000).subscribe(async () => {
      this.loadUnreadNotifications_reload();
      this.cdr.detectChanges(); // Détecter et appliquer les changements
      });

  this.timeService.getServerTime().subscribe((response) => {
    this.serverTime = response.serverTime;
   //  console.log('serveur time', this.serverTime );
  });
}


  async loadUnreadNotifications() {
   // const userId = this.userData.iduser; // Récupérer l'ID de l'utilisateur connecté

    // Charger les notifications non lues
   // await this.notificationBadgeService.loadUnreadNotifications();

    // Obtenir les notifications chargées
    this.notificationBadgeService.loadUnreadNotifications();
    this.notifications = this.notificationBadgeService.notifications;

    if (!this.notifications || this.notifications.length < 1 || this.notifications =='erreur') {
        // console.log('notif non recuperé');
          this.notifications = 'erreur';
        return; // Sortir de la fonction si les notifications ne sont pas disponibles
    }

    if (this.notifications && this.notifications.length !== 0 && this.notifications !=='erreur') {
          // Si des notifications ont été récupérées, les marquer comme lues
         //  console.log('classé comme lu',this.notifications );
          this.openNotifications();
          localStorage.setItem('notif_lu', 'lu' );
  }
}


async loadUnreadNotifications_reload() {
  // const userId = this.userData.iduser; // Récupérer l'ID de l'utilisateur connecté

   // Charger les notifications non lues
  // await this.notificationBadgeService.loadUnreadNotifications();

   // Obtenir les notifications chargées
   this.notificationBadgeService.loadUnreadNotifications2();
   this.notifications = this.notificationBadgeService.notifications;

   if (!this.notifications || this.notifications.length < 1 || this.notifications =='erreur') {
      //  console.log('notif non recuperé');
         this.notifications = 'erreur';
       return; // Sortir de la fonction si les notifications ne sont pas disponibles
   }

   if (this.notifications && this.notifications.length !== 0 && this.notifications !=='erreur') {
         // Si des notifications ont été récupérées, les marquer comme lues
        //  console.log('classé comme lu',this.notifications );
         this.openNotifications();
         localStorage.setItem('notif_lu', 'lu' );
 }
}


  openNotifications() {
    let data ={
      id : this.userData.iduser
    }
    this.notificationBadgeService.openNotifications(data);
  }

//////////// recuperer la date /////////////////////

formatCommentTime(time: string): string {
  const commentDate = new Date(time);
  const now = new Date(this.serverTime); // Utiliser l'heure du serveur
  const diffInSeconds = Math.round((now.getTime() - commentDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Il y a quelques instants';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.round(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.round(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    return commentDate.toLocaleDateString('fr-FR');
  }
}


viewNotification(notification) {
  if (notification.page && typeof notification.page === 'string' && notification.id_element) {
    // console.log(`Navigating to /${notification.page}/${notification.id_element}`);
    //this.router.navigate(['/' + notification.page, notification.id_element]);
    this.navCtrl.navigateForward('/' + notification.page, { queryParams: { id: notification.id_element} });
  } else if (notification.page && typeof notification.page === 'string') {
    // console.log(`Navigating to /${notification.page}`);
    this.router.navigate(['/' + notification.page]);
  } else {
   //  console.log('Navigating to /acceuil');
    this.router.navigate(['/acceuil']);
  }
}


async refreshPage(e: any) {

  // Rafraîchir les pubs
  await this.loadUnreadNotifications();

  // Terminer l'animation de rafraîchissement
  e.target.complete();
}


}


