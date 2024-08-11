import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User | null = null;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState;
  }

  getUserData(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('utilisateurs').doc(user.uid).valueChanges();

        } else {
          return [];
        }
      })
    );
  }

  updateUserData(data: any): Promise<void> {
    const user = this.currentUser;
    if (user) {
      return this.firestore.doc(`utilisateurs/${user.uid}`).update(data);
    } else {
      return Promise.reject('User not logged in');
    }
  }

  createUserData(user: User, data: any): Promise<void> {
    return this.firestore.doc(`utilisateurs/${user.uid}`).set(data);
  }
}
