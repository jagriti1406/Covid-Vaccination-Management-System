// vaccine.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
})
export class VaccineComponent {
  constructor(private router: Router) {}

  goToAddVaccineForm(): void {
    // Navigate to the "Add Vaccine Form" page
    this.router.navigate(['/add-vaccine-form']);
  }
}
