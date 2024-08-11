import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownTimer$ = new Subject<boolean>();
  private countdownInterval: any;
  public readonly delayDuration = 10; // 30 secondes
  private remainingTime: number;

  constructor() { }

  startCountdown(): void {
    this.remainingTime = this.delayDuration;
    this.countdownInterval = interval(1000)
      .pipe(
        takeWhile(() => this.remainingTime > 0)
      )
      .subscribe(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          this.countdownTimer$.next(true);
        }
      });
  }

  stopCountdown(): void {
    if (this.countdownInterval) {
      this.countdownInterval.unsubscribe();
    }
  }

  getCountdownTimer(): Observable<boolean> {
    return this.countdownTimer$.asObservable();
  }

  getRemainingTime(): number {
    return this.remainingTime;
  }
}
