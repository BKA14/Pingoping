import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.page.html',
  styleUrls: ['./statistique.page.scss'],
})
export class StatistiquePage implements OnInit {
  alert: any;
  oldalert: any;
  villeStats: {};
  serviceStats: {};

  constructor(
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadalert();
  }

  async loadalert() {
    this.oldalert = this.alert;
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    await loading.present();

    try {
      const res: any = await this._apiService.loadalert_statistique().toPromise();
      console.log('SUCCESS ===', res);

      if (res && res.length > 0) {
        this.alert = res;

        // Organiser les données pour les statistiques
        this.villeStats = {};
        this.serviceStats = {};

        res.forEach((alert: any) => {
          const ville = alert.ville.trim().toLowerCase().replace(/\s+/g, ' ');
          const service = alert.service.trim().toLowerCase().replace(/\s+/g, ' ');

          // Statistiques par ville
          if (this.villeStats[ville]) {
            this.villeStats[ville]++;
          } else {
            this.villeStats[ville] = 1;
          }

          // Statistiques par service
          if (this.serviceStats[service]) {
            this.serviceStats[service]++;
          } else {
            this.serviceStats[service] = 1;
          }
        });

        this.createChart();
        this.createBarChart();
        console.log('onction char appelé');

      } else {
        this.alert = 'aucune_alerte';
      }

      loading.dismiss();
    } catch (error) {
      if (this.oldalert && this.oldalert.length > 0) {
        this.alert = this.oldalert;
      } else {
        this.alert = 'erreur_chargement';
      }
      console.log('Erreur de chargement', error);
      loading.dismiss();
    }
  }

  createChart() {
    const ctx = document.getElementById('statChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie', // ou 'line', 'pie', etc.
      data: {
        labels: Object.keys(this.villeStats),
        datasets: [{
          label: 'Nombre d\'alertes par ville',
          data: Object.values(this.villeStats),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


createBarChart() {
  const ctx = document.getElementById('entrepriseChart') as HTMLCanvasElement;
  const entrepriseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(this.villeStats),
      datasets: [{
        label: '',
        data: Object.values(this.villeStats),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }]

    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


  async refreshPage(e: any) {

     await this.loadalert();

     // Log pour indiquer le rafraîchissement
     console.log('Rafraîchissement de la page');

     // Terminer l'animation de rafraîchissement
     e.target.complete();
   }

}
