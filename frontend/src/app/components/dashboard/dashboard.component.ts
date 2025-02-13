import { Component, OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/services/apartment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface Apartment {
  id: number;
  title: string;
  description: string;
  air_conditioning: boolean;
  heating: boolean;
  elevator: boolean;
  available: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  apartments: Apartment[] = [];

  constructor(
    private apartmentService: ApartmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadApartments();
  }

  loadApartments() {
    this.apartmentService.getLandlordApartments().subscribe((data: Apartment[]) => {
      this.apartments = data;
    });
  }

  toggleAvailability(apartment: Apartment) {
    this.apartmentService.updateApartment(apartment.id, { available: !apartment.available }).subscribe(() => {
      apartment.available = !apartment.available;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    });
  }
}
