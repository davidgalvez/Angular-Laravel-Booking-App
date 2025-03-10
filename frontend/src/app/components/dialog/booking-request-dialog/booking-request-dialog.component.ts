import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Apartment } from 'src/app/interfaces/apartment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-request-dialog',
  templateUrl: './booking-request-dialog.component.html',
  styleUrls: ['./booking-request-dialog.component.sass']
})
export class BookingRequestDialogComponent {
  bookingForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { apartment: Apartment }
  ){
    this.bookingForm = this.fb.group({
      apartment_id: [data.apartment.id],
      guest_name: ['', Validators.required],
      guest_birth_date: ['', [Validators.required]]
    });
  }

  submitBooking() {    
    this.dialogRef.close(this.bookingForm.value);    
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
}
