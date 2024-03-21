// admin.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private router: Router) {}

  registerNurse(): void {
    this.router.navigate(['/register-nurse']);
  }

  viewAllNurses(): void {
    this.router.navigate(['/view-all-nurses']);
  }

  viewAllPatients(): void {
    this.router.navigate(['/patient']);
  }
  viewAllVaccines(): void {
    this.router.navigate(['/vaccine']);
  }
  addVaccine(): void {
    this.router.navigate(['/add-vaccine-form']);
  }

}
