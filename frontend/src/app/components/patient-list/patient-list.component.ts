// patient-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
// import { PatientService } from '../services/patient.service'; // Import your patient service

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['ssn', 'first_name', 'last_name', 'age', 'gender', 'race', 'occupation_class', 'medical_history_description', 'phone_number', 'address','view'];
  dataSource = new MatTableDataSource();

  constructor(private patientService: PatientService,private snackBar: MatSnackBar,
    private router: Router
) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe(
      (data: any) => {
        this.dataSource.data = data.patients;
      },
      error => {
        console.error('Error fetching patients: ', error);
      }
    );
  }

  viewPatientDetails(patientId: number) {
    this.router.navigate(['/patient-schedule', patientId]);
  }
}
