import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  reservas: any = [];

  constructor(
    private apiService: ApiService, 
    private router: Router,
    public authService: AuthService){}

  ngOnInit() {
    this.apiService.getReservas().subscribe(
      (data:any) => {
        console.log('Reservas recibidas:', data);
        this.reservas = data;
      },
      (error:any) => {
        console.error('Error al obtener reservas:', error);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    });
  }

  goLoginForm() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
