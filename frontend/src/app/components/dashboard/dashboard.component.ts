import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApartmentService } from 'src/app/services/apartment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/interfaces/apartment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],  
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  apartments: Apartment[] = [];
  isLoading = true;

  constructor(
    private apartmentService: ApartmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadApartments();
  }

  loadApartments() {
    this.isLoading = true;
    this.apartmentService.getLandlordApartments().subscribe((data: Apartment[]) => {
      this.apartments = data;
      this.isLoading = false;
    },
    (error) => {
      console.error('Error loading the appartments:', error);
      this.isLoading = false; 
    });
  }

  toggleAvailability(apartment: Apartment) {
    this.apartmentService.updateApartment(apartment.id, { available: !apartment.available }).subscribe(() => {
      apartment.available = !apartment.available;
    });
  }

  
}
