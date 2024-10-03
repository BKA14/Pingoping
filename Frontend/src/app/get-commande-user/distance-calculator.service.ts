import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DistanceCalculatorService {
  constructor() {}

  haversineDistance(lat1, lon1, lat2, lon2): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance en kilomètres

    return distance * 1000; // Convertir en mètres
  }

  private toRadians(degrees): number {
    return degrees * (Math.PI / 180);
  }
}
