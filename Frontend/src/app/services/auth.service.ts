import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { WebSocketService } from '../websocket.service';


@Injectable({
  providedIn: 'root'
})
export class authService {

  new_acces_token : any;
  private websocketSubscription: Subscription;
  user : any;
  updateSubscription: Subscription;

  constructor(private http: HttpClient,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
    private wsService: WebSocketService,
  )

  {
    this.user_websocket();

    this.updateSubscription = interval(60000).subscribe(async () => {
      this.nombre_user_app();
      });
  }

  ngOnInit() {

  }

  private userDataSubject = new BehaviorSubject<any>(this.getUserData());
  userData$ = this.userDataSubject.asObservable();

  setUserData(data: any) {
    const expiry = this.calculateExpiry(data.access_token); // calculate expiry from the token
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('access_app', data.access_app)
    localStorage.setItem('grade', data.grade);
    localStorage.setItem('iduser', data.iduser);
    localStorage.setItem('numuser', data.contact);
    localStorage.setItem('prenom1', data.prenom1);
    localStorage.setItem('nom', data.nom);
    localStorage.setItem('email', data.email);
    localStorage.setItem('datefinblocage', data.datefinblocage);
    localStorage.setItem('genre', data.genre);
    localStorage.setItem('date_inscription', data.date_inscription);
    localStorage.setItem('token_expiry', expiry.toString());

    this.userDataSubject.next(data);
  }

  getUserData() {
    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      access_app: localStorage.getItem('access_app'),
      grade: localStorage.getItem('grade'),
      iduser: localStorage.getItem('iduser'),
      numuser: localStorage.getItem('numuser'),
      prenom1: localStorage.getItem('prenom1'),
      nom: localStorage.getItem('nom'),
      genre: localStorage.getItem('genre'),
      datefinblocage: localStorage.getItem('datefinblocage'),
      date_inscription: localStorage.getItem('date_inscription'),
      email: localStorage.getItem('email'),
      token_expiry: localStorage.getItem('token_expiry')
    };
  }

  updateUserField(field: string, value: any) {
    localStorage.setItem(field, value);
    const data = this.getUserData();
    this.userDataSubject.next(data);
  }

  private calculateExpiry(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // expiry time in milliseconds
  }

  private getServerTime(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._apiService.get_time().subscribe(
        (res: any) => {
          resolve(res.serverTime); // Supposons que le temps du serveur est renvoyé dans res.serverTime
        },
        (error: any) => {
          console.log("Erreur de connexion", error);
          reject(error); // Rejeter la promesse en cas d'erreur
        }
      );
    });
  }

  // Modifier isTokenExpired pour utiliser l'heure du serveur
  async isTokenExpired(): Promise<boolean> {
    const expiry = Number(localStorage.getItem('token_expiry'));
    try {
      const serverTime = await this.getServerTime();
      return serverTime > expiry;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'heure du serveur", error);
      // Gérer l'erreur ici, éventuellement retourner un résultat par défaut
      return true; // Considérez que le token est expiré si l'heure du serveur ne peut pas être récupérée
    }
  }


  private async refreshAccessToken(): Promise<void> {
    const loading = await this.loadingCtrl.create({
        message: 'Rechargement des données...',  // Message affiché dans le loading
        spinner: 'crescent',  // Type de spinner (vous pouvez choisir d'autres types)
    });

    await loading.present();  // Affiche le loader

    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response: any = await this._apiService.rafraichissement_token({ refresh_token: refreshToken }).toPromise();

        const userData = this.getUserData();

        // Mettre à jour les tokens et la date d'expiration
        userData.access_token = response.access_token;
        userData.refresh_token = response.refresh_token;
        userData.access_app = response.user.access_app;
        userData.token_expiry = this.calculateExpiry(response.access_token).toString();

        // Stocker le nouveau token dans localStorage
        localStorage.setItem('access_token', userData.access_token);
        localStorage.setItem('token_expiry', userData.token_expiry);
        localStorage.setItem('refresh_token', userData.refresh_token);
        localStorage.setItem('access_app', userData.access_app);

        console.log('contact',localStorage.getItem('numuser'));
        console.log('contact',response.user.contact);

        // Mettre à jour d'autres informations utilisateur si nécessaire
        // this.setUserData(userData);
    } catch (error) {
        alert('Erreur de connexion avec le serveur, veuillez réessayer ou contactez-nous !');
        console.log("ERROR ===", error);
    } finally {
        await loading.dismiss();  // Masque le loader
    }
}

async access_app(): Promise<string> {
  return localStorage.getItem('access_app');  // Retourne toujours le token actuel
}


async grade(): Promise<string> {
  return localStorage.getItem('grade');  // Retourne toujours le token actuel
}

async getValidAccessToken(): Promise<string> {
    if (this.isTokenExpired()) {
        await this.refreshAccessToken();  // Rafraîchit le token si expiré
    }
    return localStorage.getItem('access_token');  // Retourne toujours le token actuel
}


user_websocket() {
  const iduser = localStorage.getItem('iduser');

  this.websocketSubscription = this.wsService.listenForUserUpdates().subscribe(
    (message) => {

      if(iduser === message.old_user_id && message.action ==='update') {

        if (localStorage.getItem('iduser')?.trim()  !== message.user_id?.trim() ) {
          this.updateUserField('iduser', message.user_id);
          console.log('iduser', message.user_id);
        }

        if (localStorage.getItem('nom')?.trim()  !== message.nom?.trim() ) {
          this.updateUserField('nom', message.nom);
          console.log('nom', message.nom);
        }

        if (localStorage.getItem('prenom1')?.trim() !== message.prenom?.trim() ) {
          this.updateUserField('prenom1', message.prenom);
          console.log('prenom', message.prenom);
        }

        if (localStorage.getItem('genre')?.trim()  !== message.genre?.trim() ) {
          this.updateUserField('genre', message.genre);
          console.log('genre', message.genre);
        }

        if (localStorage.getItem('access_app')?.trim()  !== message.access_app?.trim() ) {
          this.updateUserField('access_app', message.access_app);
          console.log('access_app', message.access_app);
        }

        if (localStorage.getItem('datefinblocage')?.trim()  !== message.datefinblocage?.trim() ) {
          this.updateUserField('datefinblocage', message.datefinblocage);
          console.log('datefinblocage', message.datefinblocage);
        }

        if (localStorage.getItem('date_inscription')?.trim()  !== message.date_inscription?.trim() ) {
          this.updateUserField('date_inscription', message.date_inscription);
          console.log('date_inscription', message.date_inscription);
        }

        if (localStorage.getItem('email')?.toLowerCase() !== message.email.toLowerCase()) {
          this.updateUserField('email', message.email);
          console.log('email', message.email);
        }

        if (localStorage.getItem('grade')?.trim()  !== message.grade?.trim() ) {
          this.updateUserField('grade', message.grade);
          console.log('grade', message.grade);
        }

        if (localStorage.getItem('numuser')  !== message.contact ) {
          this.updateUserField('numuser', message.numuser);
          console.log('numuser', message.numuser);
        }
      }
    },
    (err) => console.error('WebSocket Error:', err)
  );
}

async forgotPassword(email: string) {

}


  async nombre_user_app(){

  const id = await localStorage.getItem('iduser');

  try {
    const response = await this._apiService.update_activity(id).toPromise();
    console.log('nombre user mis a jour', response);
  } catch (error) {
    console.error('nombre user non  mis a jour', error);
  }
}


}



