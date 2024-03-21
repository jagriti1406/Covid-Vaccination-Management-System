// add-vaccine.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { VaccineService } from 'path-to-your-vaccine-service'; // Adjust the import path
import { MatSnackBar } from '@angular/material/snack-bar';
import { VaccineService } from '../../services/vaccine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vaccine',
  templateUrl: './add-vaccine.component.html',
  styleUrls: ['./add-vaccine.component.css']
})
export class AddVaccineComponent implements OnInit {
  vaccineForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private vaccineService: VaccineService, // Replace with your actual service
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.vaccineForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company_name: [''],
      description: [''],
      quantity: [0, [Validators.min(0)]],
      doses_required: [1, [Validators.min(1)]]
      // Add other form controls as needed
    });
  }
  goBack(): void {
    // Navigate to some other page
    this.router.navigate(['/vaccine']);
  }
  onSubmit() {
    if (this.vaccineForm.valid) {
      const vaccineData = this.vaccineForm.value;

      this.vaccineService.addVaccine(vaccineData).subscribe({
        next: () => {
          this.snackBar.open('Vaccine added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          // Optionally, you can navigate to the vaccine list or perform other actions
        },
        error: (error: any) => {
          console.error('Error adding vaccine: ', error);
        },
      });

    } else {
      // Handle form validation errors
      this.snackBar.open('Please fill out the required fields correctly.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }
}
