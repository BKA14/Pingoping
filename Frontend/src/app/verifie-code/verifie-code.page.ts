import { MessageAdminPage } from './../message-admin/message-admin.page';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { timeService } from '../timeservice.service';

@Component({
  selector: 'app-verifie-code',
  templateUrl: './verifie-code.page.html',
  styleUrls: ['./verifie-code.page.scss'],
})
export class VerifieCodePage implements OnInit, OnDestroy {
  verificationCode: string = '';
  retryCount: number = 0; // Compteur d'essais
  maxRetries: number = 5; // Nombre maximum d'essais
  waitTime: number = 30; // Temps d'attente en secondes entre les tentatives
  additionalWaitTime: number = 600; // Temps d'attente après le nombre maximum d'essais
  isWaiting: boolean = false; // État d'attente
  waitEndTime: number = 0; // Moment où l'utilisateur pourra réessayer
  countdown: number = 0; // Temps restant avant de pouvoir réessayer
  countdownInterval: any; // Intervalle pour le compte à rebours

  serverTime: string | number | Date;
  date_now: any;

  constructor(
    public _apiService: ApiService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private timeService: timeService
  ) {}

  ngOnInit() {
    this.timeService.getServerTime().subscribe((response) => {
      this.serverTime = response.serverTime;
      console.log('Server time:', this.serverTime);
    });
  }

  ngOnDestroy() {
    // Nettoyer l'intervalle du compte à rebours si le composant est détruit
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  async verifyCode() {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });
    await loading.present();

    let data = { code: this.verificationCode };

    this._apiService.verifie_code(data).subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
        if (res.status === 'Success') {
          this.verificationCode = '';
          this.router.navigateByUrl('/login2');
          alert("Inscription validée avec succès");
        } else if (res.status === 'Error' && res.message === 'invalid_code') {
          alert("Le code de vérification entré est incorrect");
          //this.handleInvalidAttempt(); // Gérer l'échec de la tentative
        }
        loading.dismiss();
      },
      (error) => {
        console.error("Erreur ===", error);
        alert("Un problème est survenu, veuillez réessayer");
        loading.dismiss();
      }
    );
  }

  async renvoyercode() {
    if (this.isWaiting) {
      alert(`Veuillez attendre ${this.countdown} secondes avant de réessayer.`);
      return;
    }

    // Vérifiez si l'utilisateur peut réessayer
    if (this.retryCount >= this.maxRetries) {
      this.date_now = new Date(this.serverTime);
      const currentTime = Math.floor(this.date_now.getTime() / 1000); // Heure actuelle en secondes
      if (currentTime < this.waitEndTime) {
        const remainingTime = this.waitEndTime - currentTime;
        this.startCountdown(remainingTime); // Démarrer le compte à rebours
        alert(`Nombre maximum de tentatives atteint. Veuillez attendre ${Math.ceil(remainingTime)} secondes avant de réessayer.`);
        return;
      } else {
        // Réinitialiser le compteur si le temps d'attente est écoulé
        this.retryCount = 0;
      }
    }

    // Ne pas incrémenter ici si l'envoi échoue
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });
    await loading.present();

    // Tentez d'envoyer le code
    this._apiService.renvoyer_code().subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
        this.verificationCode = '';
        alert('Code renvoyé avec succès');
        loading.dismiss();

        // Incrémentez le compteur d'essai uniquement en cas de succès
        this.retryCount++;

        // Démarrer le compte à rebours
        this.startCountdown(this.waitTime);
      },
      (error) => {
        console.error("Erreur ===", error);
        alert("Un problème est survenu, veuillez réessayer");
        loading.dismiss();
        // Ne pas incrémenter le compteur ici, car l'envoi a échoué
      }
    );
  }

  handleInvalidAttempt() {
    this.retryCount++;
    if (this.retryCount >= this.maxRetries) {
      this.date_now = new Date(this.serverTime);
      this.waitEndTime = Math.floor(this.date_now.getTime() / 1000) + this.additionalWaitTime; // Mettre à jour le temps de fin d'attente
      this.startCountdown(this.additionalWaitTime);
    }
  }

  startCountdown(duration: number) {
    this.isWaiting = true;
    this.countdown = duration;

    // Nettoyer l'intervalle précédent s'il existe
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    // Mettre à jour le compte à rebours toutes les secondes
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.isWaiting = false; // Réactive le bouton après le délai
        alert(`Vous pouvez maintenant réessayer.`);
      }
    }, 1000); // Mettre à jour toutes les secondes
  }
}
