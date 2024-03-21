// nurse-schedule.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-nurse-schedule',
  templateUrl: './nurse-schedule.component.html',
  styleUrls: ['./nurse-schedule.component.css']
})
export class NurseScheduleComponent implements OnInit {
  availableTimeSlots: any[] = [];
  selectedTimeSlot: any = {};
  nurseSchedules: any[] = [];
  nurseId:any;
  constructor(
    private nurseService: NurseService,
    private snackBar: MatSnackBar,private router: Router
  ) {}

  ngOnInit(): void {
    const val= localStorage.getItem('user');
    if (val !== null) {
      const userObject = JSON.parse(val);
      this.nurseId = userObject.role_based_id;
      // Other operations with userObject or properties
  } else {
    this.router.navigate(['/login']);
      // Handle the case where 'user' key is not present in localStorage
      console.error("User data not found in localStorage");
  }
    this.getAvailableTimeSlots();
    this.getNurseSchedules();
  }

  getAvailableTimeSlots() {
    this.nurseService.getAvailableTimeSlots().subscribe(
      (data: any) => {
        this.availableTimeSlots = data.timeslots;
      },
      (error: any) => {
        console.error('Error fetching available time slots: ', error);
      }
    );
  }

  chooseTimeSlot(selectedTimeSlot:any) {
    if (selectedTimeSlot && selectedTimeSlot.time_slot_id) {
      // Extract date, start time, and end time from the selected time slot
      const { date, start_time, end_time } =selectedTimeSlot;

      // Call the API to register nurse schedule with date, start time, and end time
      const data = {
        // nurse_employee_id: /* get nurse ID from your authentication */
        time_slot_id: selectedTimeSlot.time_slot_id,
        nurse_employee_id: this.nurseId
      };

      this.nurseService.registerNurseSchedule(data).subscribe(
        () => {
          this.snackBar.open('Schedule registered successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.getNurseSchedules();
          // Optionally, you can refresh the available time slots after registration
          // this.getAvailableTimeSlots();
        },
        (error: any) => {
          console.error('Error registering nurse schedule: ', error);
        }
      );
    } else {
      // Handle case where no time slot is selected
      this.snackBar.open('Please select a time slot before choosing.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }
  getNurseSchedules() {
    this.nurseService.getNurseSchedules(this.nurseId).subscribe({
      next: (data: any) => {
        this.nurseSchedules = data.nurse_schedule;
      },
      error: (error: any) => {
        console.error('Error fetching nurse schedules: ', error);
      },
      complete: () => {
        // Optional: Add logic to handle completion if needed
      }
    });

  }
  cancelNurseSchedule(scheduleId: number) {
    // Call the API to cancel the nurse schedule
    this.nurseService.cancelNurseSchedule(scheduleId).subscribe(
      () => {
        this.snackBar.open('Schedule canceled successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });

        // Optionally, you can refresh the nurse schedules after cancellation
        this.getNurseSchedules();
      },
      (error: any) => {
        console.error('Error canceling nurse schedule: ', error);
      }
    );
  }
}
