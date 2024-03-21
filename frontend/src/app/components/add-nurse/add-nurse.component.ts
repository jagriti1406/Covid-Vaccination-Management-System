// add-nurse.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';
// import { NurseService } from '../services/nurse.service'; // Update the path accordingly

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css'],
})
export class AddNurseComponent implements OnInit {
  nurseForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private nurseService: NurseService, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.nurseForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      role_id: ['1'],
      middle_name: [''],
      last_name: [''],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      address: [''],
    });
  }
  goBack(): void {
    // Navigate to some other page
    this.router.navigate(['/admin']);
  }
  onSubmit(): void {
    if (this.nurseForm.valid) {
      const formData = this.nurseForm.value;
      console.log(formData);
      // Call the service method to add the nurse using formData
      this.nurseService.addNurse(formData).subscribe({
        next: () => {
          this.snackBar.open('Nurse added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.nurseForm.reset();
          // Optionally, you can navigate to the nurse list or perform other actions
        },
        error: (error: any) => {
          console.error('Error adding nurse: ', error);
          // Handle error scenarios
        },
      });

    } else {
      // Form is invalid, display an error message or perform other actions
      console.log('Invalid form');
    }
  }

}
