import { Injectable } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  private keyboardVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private keyboard: Keyboard) {
    this.setupKeyboardListeners();
  }

  private setupKeyboardListeners() {
    this.keyboard.onKeyboardDidShow().subscribe(() => {
      this.keyboardVisibleSubject.next(true);
    });

    this.keyboard.onKeyboardDidHide().subscribe(() => {
      this.keyboardVisibleSubject.next(false);
    });
  }

  isKeyboardVisible(): Observable<boolean> {
    return this.keyboardVisibleSubject.asObservable();
  }

  scrollToInput(content: IonContent, yOffset: number = 0, duration: number = 200) {
    content.scrollToPoint(0, yOffset, duration);
  }
}
