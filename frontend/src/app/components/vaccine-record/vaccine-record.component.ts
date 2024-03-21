// vaccine-record.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { VaccineService } from 'path-to-your-service'; // Update with the correct path
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-vaccine-record',
  templateUrl: './vaccine-record.component.html',
  styleUrls: ['./vaccine-record.component.css']
})
export class VaccineRecordComponent implements OnInit {
  vaccineRecordForm: FormGroup;
  nurseSchedules: any[] = []; // You need to populate this with actual nurse schedules
  displayedColumns: string[] = ['email', 'patient_id','patient_name', 'start_time', 'end_time', 'vaccine_name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  nurseId:any;
  constructor(private fb: FormBuilder, private nurseService: NurseService,private router: Router) {
    this.vaccineRecordForm = this.fb.group({
      nurseSchedule: [''] // Update with your actual form controls
    });
  }

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
    // Fetch nurse schedules and populate the dropdown
    this.nurseService.getNurseSchedules(this.nurseId).subscribe((data: any) => {
      this.nurseSchedules = data.nurse_schedule;
    });

    // Fetch initial data for the table (optional)
    this.fetchTableData();
  }

  onSubmit() {
    // Fetch data for the selected nurse schedule
    this.fetchTableData();
  }

  private fetchTableData() {
    const selectedNurseScheduleId = this.vaccineRecordForm.value.nurseSchedule;

    // Call the service method to fetch vaccination schedules by timeslot id
    this.nurseService.getVaccinationSchedulesByTimeSlotId(selectedNurseScheduleId).subscribe({
      next: (data: any) => {
        // Update the table data source
        this.dataSource.data = data.schedules;
      },
      error: (error: any) => {
        console.error('Error fetching vaccination schedules: ', error);
      }
    });
  }

  onRegister(schedule:any) {
    console.log(schedule);
    // Call the service method to register the vaccination record
    const formData:any={
      vaccine_schedule_id:schedule.schedule_id,
      patient_id: schedule.patient_id,
      dose_number: schedule.dose_no,
      vaccine_id: schedule.vaccine_id,
      nurse_id:this.nurseId
    }
    console.log(formData);
    this.nurseService.registerVaccinationRecord(formData).subscribe({
      next: (data: any) => {
        // Optionally, you can update the table or show a success message
        console.log('Vaccination record registered successfully:', data);
        this.fetchTableData();
      },
      error: (error: any) => {
        console.error('Error registering vaccination record: ', error);
      }
    });
  }
}
