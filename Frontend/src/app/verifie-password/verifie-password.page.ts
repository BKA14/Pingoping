import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { timeService } from '../timeservice.service';

@Component({
  selector: 'app-verifie-password',
  templateUrl: './verifie-password.page.html',
  styleUrls: ['./verifie-password.page.scss'],
})
export class VerifiePasswordPage implements OnInit {
  verificationCode: any = '';
  retryCount: number = 0; // Compteur d'essais
  maxRetries: number = 5; // Nombre maximum d'essais
  waitTime: number = 30; // Temps d'attente en secondes entre les tentatives
  additionalWaitTime: number = 600; // Temps d'attente en secondes après le nombre maximum d'essais
  isWaiting: boolean = false; // État d'attente
  canRetry: boolean = true; // Permet de savoir si l'utilisateur peut réessayer
  waitEndTime: number = 0; // Moment où l'utilisateur pourra réessayer

  serverTime: string | number | Date;
  date_now : any;


  constructor(
    public _apiService: ApiService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private timeService: timeService

  ) {}

  ngOnInit() {
    this.timeService.getServerTime().subscribe((response) => {
      this.serverTime = response.serverTime;
      console.log('serveur time', this.serverTime );
    });
  }


  async verifyCode() {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });
    await loading.present();

    let data = { code: this.verificationCode };

    this._apiService.verifie_code_two(data).subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
        if (res.status === 'Success') {
          this.verificationCode = '';
          this.router.navigateByUrl('/change-password');
        } else if (res == 'invalide') {
          alert("Le code de vérification entré est incorrect");
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
      alert(`Veuillez attendre ${this.waitTime} secondes avant de réessayer.`);
      return;
    }

    // Vérifiez si l'utilisateur peut réessayer
    if (this.retryCount >= this.maxRetries) {
      this.date_now = new Date(this.serverTime);
      const currentTime = Math.floor(this.date_now.getTime() / 1000); // Heure actuelle en secondes
      if (currentTime < this.waitEndTime) {
        const remainingTime = this.waitEndTime - currentTime;
        alert(`Nombre maximum de tentatives atteint. Veuillez attendre ${Math.ceil(remainingTime)} secondes avant de réessayer.`);
        return;
      } else {
        // Réinitialiser le compteur si le temps d'attente est écoulé
        this.retryCount = 0;
        this.canRetry = true; // Autoriser à réessayer
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
    this._apiService.renvoyer_otp_two().subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
        this.verificationCode = '';
        alert('Code renvoyé avec succès');
        loading.dismiss();

        // Incrémentez le compteur d'essai uniquement en cas de succès
        this.retryCount++;

        // Démarrer le compte à rebours
        this.startCountdown();
      },
      (error) => {
        console.error("Erreur ===", error);
        alert("Un problème est survenu, veuillez réessayer");
        loading.dismiss();
        // Ne pas incrémenter le compteur ici, car l'envoi a échoué
      }
    );
  }


  startCountdown() {
    setTimeout(() => {
      this.isWaiting = false; // Réactive le bouton après le délai
      alert(`Vous pouvez maintenant réessayer.`);
    }, this.waitTime * 1000); // Convertir les secondes en millisecondes

    // Si le nombre maximum de tentatives est atteint, définissez le temps d'attente
    if (this.retryCount >= this.maxRetries) {
      this.canRetry = false;
      this.date_now = new Date(this.serverTime)
      this.waitEndTime = Math.floor(this.date_now / 1000) + this.additionalWaitTime; // Mettre à jour le temps de fin d'attente
      alert(`Vous devez attendre ${this.additionalWaitTime / 60} minutes avant de pouvoir réessayer.`);
    }
  }

}
