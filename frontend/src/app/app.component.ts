import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './services/api.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  reservas: any = [];

  constructor(private apiService: ApiServiceService){}

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

}
