import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Subject, Observable } from 'rxjs';
import { retryWhen, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private signalisationMessagesSubject = new Subject<any>();
  private pubMessagesSubject = new Subject<any>();
  private likesMessagesSubject = new Subject<any>();
  private commentairesMessagesSubject = new Subject<any>();
  private signalementMessagesSubject = new Subject<any>();
  private userMessagesSubject = new Subject<any>();
  private notificationsMessagesSubject = new Subject<any>();
  public isConnected = false;

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket$ = new WebSocketSubject('ws://localhost:8081');

    this.socket$.pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(() => {
            console.log('Tentative de reconnexion...');
          }),
          delay(3000) // Délai de 3 secondes avant la prochaine tentative
        )
      )
    ).subscribe(
      (message) => {
        try {
          console.log(message);
          if (Array.isArray(message)) {
            // Gérer le tableau de données initial
            if (message.length > 0 && message[0].type === 'signalisation') {
              this.signalisationMessagesSubject.next(message);
            } else if (message.length > 0 && message[0].type === 'pub') {
              this.pubMessagesSubject.next(message);
            } else if (message.length > 0 && message[0].type === 'etatdelikes') {
              this.likesMessagesSubject.next(message);
            } else if (message.length > 0 && message[0].type === 'commentaires') {
              this.commentairesMessagesSubject.next(message);
            } else if (message.length > 0 && message[0].type === 'signalement') {
              this.signalementMessagesSubject.next(message);
            } else if (message.length > 0 && message[0].type === 'user') {
              this.userMessagesSubject.next(message);
            } else if (message.length > 0 && message[0].type === 'notifications') {
              this.notificationsMessagesSubject.next(message);
            }
          } else {
            // Gérer le message unique
            if (message.type === 'signalisation') {
              this.signalisationMessagesSubject.next(message);
            } else if (message.type === 'pub') {
              this.pubMessagesSubject.next(message);
            } else if (message.type === 'etatdelikes') {
              this.likesMessagesSubject.next(message);
            } else if (message.type === 'commentaires') {
              this.commentairesMessagesSubject.next(message);
            } else if (message.type === 'signalement') {
              this.signalementMessagesSubject.next(message);
            } else if (message.type === 'user') {
              this.userMessagesSubject.next(message);
            } else if (message.type === 'notifications') {
              this.notificationsMessagesSubject.next(message);
            }
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      (err) => {
        console.error('WebSocket Error:', err);
        this.isConnected = false;
      },
      () => {
        console.log('WebSocket connection closed, reconnecting...');
        this.isConnected = false;
        this.reconnect();
      }
    );
  }

  private reconnect(): void {
    // Appel continu à la méthode connect() pour une reconnexion permanente
    setTimeout(() => {
      this.connect();
    }, 2000); // Délai de 2 secondes avant de tenter une nouvelle connexion
  }

  public listenForSignalisationUpdates(): Observable<any> {
    return this.signalisationMessagesSubject.asObservable();
  }

  public listenForPubUpdates(): Observable<any> {
    return this.pubMessagesSubject.asObservable();
  }

  public listenForLikesUpdates(): Observable<any> {
    return this.likesMessagesSubject.asObservable();
  }

  public listenForCommentairesUpdates(): Observable<any> {
    return this.commentairesMessagesSubject.asObservable();
  }

  public listenForSignalementUpdates(): Observable<any> {
    return this.signalementMessagesSubject.asObservable();
  }

  public listenForUserUpdates(): Observable<any> {
    return this.userMessagesSubject.asObservable();
  }

  public listenForNotificationsUpdates(): Observable<any> {
    return this.notificationsMessagesSubject.asObservable();
  }
}
