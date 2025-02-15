import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apartment } from '../interfaces/apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private apiUrl = 'http://localhost:8000/api/apartments';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getLandlordApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiUrl}/landlord`, { headers: this.getAuthHeaders() });
  }

  updateApartment(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  getAvailableApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }
}
