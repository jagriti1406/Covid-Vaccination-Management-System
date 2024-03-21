// view-time-slots.component.ts
import { Component, OnInit } from '@angular/core';
// import { TimeSlotService } from '../services/time-slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeSlotService } from 'src/app/services/time-slot.service';

@Component({
  selector: 'app-view-time-slots',
  templateUrl: './view-time-slots.component.html',
  styleUrls: ['./view-time-slots.component.css']
})
export class ViewTimeSlotsComponent implements OnInit {
  timeSlots: any[] = [];

  constructor(private timeSlotService: TimeSlotService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTimeSlots();
  }

  getTimeSlots() {
    this.timeSlotService.getTimeSlots().subscribe(
      (data: any) => {
        this.timeSlots = data;
      },
      error => {
        console.error('Error fetching time slots: ', error);
      }
      
    );
  }

  calculateRemainingCapacity(timeSlot: any): number {
    // Implement your logic to calculate remaining capacity (e.g., subtract scheduled patients from max capacity)
    const scheduledPatients = timeSlot.scheduledPatients || 0; // Replace with the actual property from your API
    const remainingCapacity = timeSlot.max_patient_capacity - scheduledPatients;
    return remainingCapacity >= 0 ? remainingCapacity : 0;
  }

  scheduleVaccination(timeSlotId: number) {
    // Implement your logic to schedule vaccination based on the selected time slot
    this.snackBar.open('Vaccination scheduled successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
