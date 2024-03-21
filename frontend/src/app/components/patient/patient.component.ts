import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  patientId:any;
  constructor(private router: Router,
    private nurseService: NurseService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const val= localStorage.getItem('user');
    if (val !== null) {
      const userObject = JSON.parse(val);
      this.patientId = userObject.role_based_id;
      // Other operations with userObject or properties
  } else {
    this.router.navigate(['/login']);
      // Handle the case where 'user' key is not present in localStorage
      console.error("User data not found in localStorage");
  }
    // this.isAdmin =true;
    // this.route.params.subscribe(params => {
    //   this.nurseId = +params['id'];
    //   this.getNurseDetails();
    // });
  }

  viewMySchedule=()=>{
    this.router.navigate(['/patient-schedule',this.patientId]);
  }
  viewMyDetails=()=>{
    this.router.navigate(['/patient/view-my-details',this.patientId]);
  }
  scheduleVaccination=()=>{
    this.router.navigate(['/patient/schedule-vaccination',this.patientId]);
  }
}
