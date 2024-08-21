import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Capacitor } from '@capacitor/core';
import { environment } from "../environments/environment";
import { authService } from "./services/auth.service"; // Import AuthService correctly
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";

// Initialize Firebase
const app = initializeApp(environment);
const messaging = getMessaging(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService  {
  userData: any; // Consider using a more specific type

  constructor(
    private authService: authService,
     private _apiService: ApiService
    )
    {
    // Subscribe to user data changes
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });
  }

  async initFirebaseMessaging() {
    if (!Capacitor.isNativePlatform()) {
      try {
        const currentToken = await getToken(messaging, { vapidKey: environment.vapidKey });
        if (currentToken) {
          await this.sendTokenToServer(currentToken);
        } else {
          // Handle case where no token is received
          console.log('No token received. Request permission to enable notifications.');
        }
      } catch (err) {
        console.error('Error getting token:', err);
      }

      onMessage(messaging, (payload) => {
        console.log('Message received on web:', payload);

        const notification = new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: '/assets/notif_icon.png',
     // Si disponible
        });

        notification.onclick = () => {
          // Rediriger l'utilisateur vers une page spécifique ou effectuer une action
          window.open(payload.data.link, '/'); // Exemple de redirection
        };
      });
    }
  }

  async sendTokenToServer(token: string) {
    console.log('Token received:', token);

    if (this.userData) {
     // console.log('User data:', this.userData);

      const data = {
        token,
        role: this.userData.grade,
      };

      this._apiService.sendtoken(data).subscribe(
        (res: any) => {
          console.log('Token sent successfully:', res);
        },
        (error: any) => {
          console.error('Error sending token:', error);
        }
      );
    } else {
      console.error('User data not defined.');
    }
  }
}
