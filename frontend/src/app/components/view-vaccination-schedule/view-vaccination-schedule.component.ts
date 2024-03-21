// view-vaccination-schedule.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { PatientService } from '../services/patient.service'; // Import your patient service
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-vaccination-schedule',
  templateUrl: './view-vaccination-schedule.component.html',
  styleUrls: ['./view-vaccination-schedule.component.css']
})
export class ViewVaccinationScheduleComponent implements OnInit {
  patientId!: number;
  isAdmin:boolean=false;
  vaccinationSchedule: any[] = [];
  displayedColumns: string[] = ['status', 'vaccineName', 'date', 'startTime', 'endTime','actions'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // Assuming your route has 'id' parameter

    });
    // this.patientId = +this.route.snapshot.paramMap.get('id');
    // this.patientId = 1;
    this.getVaccinationSchedule();
  }
  // convertTimeStringToDate(timeString: string): Date {
  //   // Add a dummy date (e.g., 1970-01-01) to the time string
  //   const fullDateString = `1970-01-01 ${timeString}`;
  //   return new Date(fullDateString);
  // }
  getVaccinationSchedule() {
    this.patientService.getVaccinationSchedule(this.patientId).subscribe(
      (data: any) => {
        this.vaccinationSchedule = data.schedules;
      },
      (error:any)=> {
        console.error('Error fetching vaccination schedule: ', error);
      }
    );
  }

  cancelSchedule(scheduleId: number) {
    // Implement your logic to cancel the vaccination schedule based on the scheduleId
    this.patientService.cancelVaccinationSchedule(scheduleId).subscribe(
      (data: any) => {
        this.snackBar.open('Vaccination schedule canceled successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        // Refresh the schedule after cancellation
        this.getVaccinationSchedule();
      },
      (error:any)=> {
        console.error('Error canceling vaccination schedule: ', error);
      }
    );
  }

  redirectToTimeSlots() {
    this.router.navigate(['/view-time-slots']);
  }
}
