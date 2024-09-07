import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class timeService {

  constructor(
    private http: HttpClient,
    public _apiService: ApiService)
    {

    }

  getServerTime(): Observable<any> {
    return   this._apiService.get_time();
  }
}
