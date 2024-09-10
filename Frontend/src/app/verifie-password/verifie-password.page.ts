import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { timeService } from '../timeservice.service';

@Component({
  selector: 'app-verifie-password',
  templateUrl: './verifie-password.page.html',
  styleUrls: ['./verifie-password.page.scss'],
})
export class VerifiePasswordPage implements OnInit {
verificationCode: string = '';
isWaiting: boolean = false;
countdown: number = 0;
countdownInterval: any;

constructor(
  public _apiService: ApiService,
  private router: Router,
  private loadingCtrl: LoadingController,
  private toastCtrl: ToastController  // Injecter le ToastController
) {}

ngOnInit() {}

ngOnDestroy() {
  if (this.countdownInterval) {
    clearInterval(this.countdownInterval);
  }
}

// Méthode pour afficher un toast
async presentToast(message: string, color: string = 'danger') {
  const toast = await this.toastCtrl.create({
    message: message,
    duration: 2000, // Durée d'affichage du toast
    position: 'bottom',
    color: color,
  });
  toast.present();
}

async verifyCode() {
  const loading = await this.loadingCtrl.create({
    message: 'Vérification...',
    spinner: 'lines',
  });
  await loading.present();

  let data = { code: this.verificationCode };

  this._apiService.verifie_code_two(data).subscribe(
    (res: any) => {
      loading.dismiss();
      if (res.status === 'Success') {
        this.verificationCode = '';
        this.router.navigateByUrl('/change-password');
        this.presentToast('Inscription validée avec succès', 'success');
      } else if (res == 'invalide') {
        this.presentToast('Le code de vérification est incorrect.');
      }
    },
    (error) => {
      loading.dismiss();
      console.error('Erreur', error);
      this.presentToast('Une erreur est survenue, veuillez réessayer.');
    }
  );
}

async renvoyercode() {
  if (this.isWaiting) {
    this.presentToast(`Veuillez attendre ${this.countdown} secondes avant de réessayer.`, 'warning');
    return;
  }

  const loading = await this.loadingCtrl.create({
    message: 'Renvoi du code...',
    spinner: 'lines',
  });
  await loading.present();

  this._apiService.renvoyer_otp_two().subscribe(
    async (res: any) => {
      loading.dismiss();
      if (res.status === 'Success') {
        this.presentToast('Le code de vérification a été renvoyé.', 'success');
        if(res.remaining_time !== 'non'){
          await  this.startCountdown(res.remaining_time);
        }
      } else if (res.status === 'attendre') {
        if(res.remaining_time !== 'non'){
          await  this.startCountdown(res.remaining_time);
          this.presentToast(res.message, 'danger');
        }
      }
    },
    (error) => {
      loading.dismiss();
      console.error('Erreur lors du renvoi du code', error);
      this.presentToast('Une erreur est survenue, veuillez réessayer.', 'danger');
    }
  );
}

async startCountdown(duration: number) {

  this.countdown = await duration;
  this.isWaiting = true;

  if (this.countdownInterval) {
    clearInterval(this.countdownInterval);
  }

  this.countdownInterval = setInterval(() => {
    this.countdown--;
    if (this.countdown <= 0) {
      clearInterval(this.countdownInterval);
      this.isWaiting = false;
    }
  }, 1000);
}
}
