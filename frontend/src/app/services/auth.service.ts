import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/landlord';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('authToken'); 
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token);
        }
      })
    );
  }

  logout() {
    
    return this.http.post(`${this.apiUrl}/logout`,{}, { headers: this.getAuthHeaders() }).pipe(
      tap(response => {
        localStorage.removeItem('authToken');
      })
    );
    
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken'); 
    return !!token; 
  }
}
