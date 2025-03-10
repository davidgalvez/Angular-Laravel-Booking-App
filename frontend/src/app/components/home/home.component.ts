import { Component , OnInit, inject } from '@angular/core';
import { ApartmentService } from 'src/app/services/apartment.service';
import { Apartment } from 'src/app/interfaces/apartment';
import { MatDialog } from '@angular/material/dialog';
import { BookingRequestDialogComponent } from '../dialog/booking-request-dialog/booking-request-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  isLoading = true;
  readonly dialog = inject(MatDialog);
  
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

  openBookingDialog(apartment: Apartment) {
    const dialogRef = this.dialog.open(BookingRequestDialogComponent, {
      width: '400px',
      data: { apartment: apartment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Booking submitted:', result);
        // TODO: Call service to send the reservation request
      }
    });
  }
}
