import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verifie-code',
  templateUrl: './verifie-code.page.html',
  styleUrls: ['./verifie-code.page.scss'],
})
export class VerifieCodePage implements OnInit, OnDestroy {
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

    this._apiService.verifie_code(data).subscribe(
      (res: any) => {
        loading.dismiss();
        if (res.status === 'Success') {
          this.verificationCode = '';
          this.router.navigateByUrl('/login2');
          this.presentToast('Inscription validée avec succès', 'success');
        } else {
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

    this._apiService.renvoyer_code().subscribe(
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
