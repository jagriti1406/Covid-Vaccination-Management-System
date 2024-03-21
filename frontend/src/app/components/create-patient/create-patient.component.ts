// create-patient.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
// import { PatientService } from '../services/patient.service'; // Import your patient service

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patientForm!: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.patientForm = this.fb.group({
      ssn: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required],
      race: [''],
      occupationClass: [''],
      medicalHistoryDescription: [''],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$')]],
      address: [''],
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.createPatient(this.patientForm.value).subscribe(
        (data: any) => {
          console.log('Patient created successfully: ', data);
          // Optionally, you can navigate to the patient list or display a success message
        },
        error => {
          console.error('Error creating patient: ', error);
        }
      );
    }
  }
}
