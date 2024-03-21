import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {

  nurseId:any;
  constructor(private router: Router,
    private nurseService: NurseService,
    private snackBar: MatSnackBar
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
    // this.isAdmin =true;
    // this.route.params.subscribe(params => {
    //   this.nurseId = +params['id'];
    //   this.getNurseDetails();
    // });
  }

  addVaccineRecord=()=>{
    this.router.navigate(['/vaccination-record',this.nurseId]);
  }
  RedirectNurseSchedule=()=>{
    this.router.navigate(['/add-nurse-schedule',this.nurseId]);
  }
  viewMyDetails=()=>{
    this.router.navigate(['/view-nurse-details',this.nurseId]);
  }
}
