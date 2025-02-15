import { Component , OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/services/apartment.service';
import { Apartment } from 'src/app/interfaces/apartment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  isLoading = true;
  
  filters = {
    air_conditioning: false,
    heating: false,
    elevator: false
  };

  constructor(private apartmentService: ApartmentService) {}

  ngOnInit() {
    this.loadApartments();
  }

  loadApartments() {
    this.isLoading = true;
    this.apartmentService.getAvailableApartments().subscribe((data: Apartment[]) => {
      this.apartments = data;
      this.filteredApartments = data;
      this.isLoading = false;
    });
  }

  applyFilters() {
    this.filteredApartments = this.apartments.filter(apartment =>
      (!this.filters.air_conditioning || apartment.air_conditioning) &&
      (!this.filters.heating || apartment.heating) &&
      (!this.filters.elevator || apartment.elevator)
    );
  }
}
