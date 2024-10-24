import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  async getUserLocation(): Promise<{ latitude: number, longitude: number } | null> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return { latitude: coordinates.coords.latitude, longitude: coordinates.coords.longitude };
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
      return null; // Renvoie null en cas d'erreur
    }
  }
}
