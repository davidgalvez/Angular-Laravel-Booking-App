import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getReservas() {
    return this.http.get(`${this.apiUrl}/reservas`);
  }
}
