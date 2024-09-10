import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { LoadingController } from '@ionic/angular';
import { authService } from './services/auth.service';
import { WebSocketService } from './websocket.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationBadgeService {

  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  public notifications : any; // Stocker les notifications localement
  userData: any;
  private websocketSubscription: Subscription;
  ancien_valeur: any;
  valeur: string;
  updateSubscription: Subscription;
  valeur_count: number;
  old_unreadCount: number;


  constructor(
    private http: HttpClient,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController, // Injection de LoadingController si nécessaire
    private authService: authService,
    private wsService: WebSocketService,

  ) {
      // S'abonner aux changements de données utilisateur
      this.authService.userData$.subscribe(data => {
        this.userData = data;
      });

      this.loadUnreadNotifications();

      this.notifications_websocket();
  }

    // Méthode pour obtenir la valeur ancienne des notif non lu sans souscription
  async getUnreadCount(): Promise<number> {
    return await this.unreadCountSubject.getValue(); // Utiliser getValue() sur BehaviorSubject
  }

  async loadUnreadNotifications(): Promise<void> {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    try {
      await loading.present();

      // Charger les notifications non lues
      const notifications = await this.getUnreadNotifications(this.userData.iduser).toPromise();

      if (notifications) {
        console.log('Notifications récupérées:', notifications);
        this.notifications = notifications;
        this.valeur_count = this.notifications.length;

        if (this.valeur_count !== 0) {
          // Récupérer les notifications existantes depuis le localStorage
          let storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];

          // Filtrer les notifications reçues qui ne sont pas déjà dans le localStorage
          const newNotifications = this.notifications.filter((notification) => {
            return !storedNotifications.some((storedNotification) => storedNotification.id === notification.id);
          });

          // Ajouter uniquement les nouvelles notifications au début de la liste
          storedNotifications = [...newNotifications, ...storedNotifications];

          // Garder uniquement les 5 dernières notifications
          storedNotifications = storedNotifications.slice(0, 5);

          // Mettre à jour le localStorage avec la liste modifiée
          localStorage.setItem('notifications', JSON.stringify(storedNotifications));
          this.notifications = storedNotifications;

          console.log('Notifications bien chargées sans doublons:', this.notifications);
        }
         else {
          // Charger les notifications depuis le localStorage s'il n'y a pas de nouvelles notifications
          const storedNotifications = localStorage.getItem('notifications');
          if (storedNotifications) {
            this.notifications = JSON.parse(storedNotifications);
            console.log('Notifications chargées en local:', this.notifications);
          } else {
            console.log('Aucune notification trouvée pour cet utilisateur');
            this.notifications = 'erreur';
          }
          return
        }

      // Appel pour obtenir la valeur actuelle sans souscription
      this.old_unreadCount = await this.getUnreadCount();
      console.log('Old unread count:', this.old_unreadCount);


       if(this.old_unreadCount !== 0){
        const unreadCount = this.valeur_count + this.old_unreadCount;
        // Mettre à jour le nombre de notifications non lues
        console.log('Nombre de notifications non lues plus ceux recu:', unreadCount);
        this.updateUnreadCount(unreadCount); // Mise à jour du compteur partagé
       }else{
        const unreadCount = await this.valeur_count;
        // Mettre à jour le nombre de notifications non lues
        console.log('Nombre de notifications non lues:', unreadCount);
        this.updateUnreadCount(await unreadCount); // Mise à jour du compteur partagé
       }

      }

    } catch (error) {
      console.error('Erreur lors du chargement des notifications non lues:', error);
    } finally {
      await loading.dismiss();
    }
  }

  async loadUnreadNotifications2(): Promise<void> {

    try {
      // Charger les notifications non lues
      const notifications = await this.getUnreadNotifications(this.userData.iduser).toPromise();

      if (notifications) {
        console.log('Notifications récupérées:', notifications);
        this.notifications = notifications;
        this.valeur_count = this.notifications.length;

        if (this.valeur_count !== 0) {
          // Récupérer les notifications existantes depuis le localStorage
          let storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];

          // Filtrer les notifications reçues qui ne sont pas déjà dans le localStorage
          const newNotifications = this.notifications.filter((notification) => {
            return !storedNotifications.some((storedNotification) => storedNotification.id === notification.id);
          });

          // Ajouter uniquement les nouvelles notifications au début de la liste
          storedNotifications = [...newNotifications, ...storedNotifications];

          // Garder uniquement les 5 dernières notifications
          storedNotifications = storedNotifications.slice(0, 5);

          // Mettre à jour le localStorage avec la liste modifiée
          localStorage.setItem('notifications', JSON.stringify(storedNotifications));
          this.notifications = storedNotifications;

          console.log('Notifications bien chargées sans doublons:', this.notifications);
        }
         else {
          // Charger les notifications depuis le localStorage s'il n'y a pas de nouvelles notifications
          const storedNotifications = localStorage.getItem('notifications');
          if (storedNotifications) {
            this.notifications = JSON.parse(storedNotifications);
            console.log('Notifications chargées en local:', this.notifications);
          } else {
            console.log('Aucune notification trouvée pour cet utilisateur');
            this.notifications = 'erreur';
          }
          return
        }

        // Appel pour obtenir la valeur actuelle sans souscription
        this.old_unreadCount = await this.getUnreadCount();
        console.log('Old unread count:', this.old_unreadCount);

        const unreadCount = await this.valeur_count;
        // Mettre à jour le nombre de notifications non lues
        console.log('Nombre de notifications non lues:', unreadCount);
        this.updateUnreadCount( await unreadCount); // Mise à jour du compteur partagé

      }

    } catch (error) {
      console.error('Erreur lors du chargement des notifications non lues:', error);
    }
  }



  openNotifications(data): void {
    this.mark_read(data).subscribe(() => {
      this.notifications.forEach((notif) => {
        notif.isread = true;
      });

      this.updateUnreadCount(0); // Réinitialiser le compteur partagé
      console.log(' isread mis a jour');

    }, (error) => {
      console.error('Erreur lors de la mise à jour des notifications comme lues:', error);
    });
  }

  getUnreadNotifications(userId: string): Observable<any[]> {
    return this._apiService.isread(userId);
  }

  mark_read(data): Observable<any> {
    return this._apiService.notification_lu(data);
  }

  updateUnreadCount(count: number): void {
    this.unreadCountSubject.next(count);
  }

  notifications_websocket() {
    this.websocketSubscription = this.wsService.listenForNotificationsUpdates().subscribe(
      async (message) => {
        if (Array.isArray(message)) {
          // Chargement initial des alertes (désactivé ici)
          // this.signalement = message;
          // console.log('Initial alerts loaded:', this.signalement);
        } else {
          switch (message.action) {
            case 'insert':
                 console.log('websocket insert 1');
                 this.loadUnreadNotifications2();
                 console.log('websocket insert 2');
              break;

            case 'update':
              console.log('Mise à jour de notification:', message);
              //let storedNotifications = localStorage.getItem('notifications');

              const updatedIndex = this.notifications.findIndex(async notif => await notif.id  == await message.old_notifications_id);
              if (updatedIndex !== -1) {
                this.notifications[updatedIndex] = message;
                localStorage.setItem('notifications', JSON.stringify(this.notifications));
                console.log('Notification mise à jour:', message);
              } else {
                console.log('Notification non trouvée pour la mise à jour:', message.old_notifications_id);
              }
              break;

              case 'delete':
                console.log('Suppression de notification:', message);

                this.notifications.forEach(notif => {
                  console.log('Comparaison:', notif.id, message.notifications_id);
                });

                this.notifications = this.notifications.filter(notif => +notif.id !== +message.notifications_id);

                localStorage.setItem('notifications', JSON.stringify(this.notifications));
                console.log('Notification supprimée:', message.notifications_id);
                break;


            default:
              console.log('Action inconnue:', message);
          }
        }
      },
      (err) => console.error('Erreur WebSocket:', err)
    );
  }

}
