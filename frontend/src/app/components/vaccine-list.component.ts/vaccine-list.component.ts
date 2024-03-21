// vaccine-list.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.css']
})
export class VaccineListComponent implements OnInit {
  vaccines!: any[];
  dynamicColumns: string[] = ['name', 'company_name', 'description', 'quantity', 'doses_required','on_hold_count'];
  displayedColumns: string[] = [...this.dynamicColumns, 'actions'];

  constructor(private vaccineService: VaccineService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vaccineService.getVaccines().subscribe(data => {
      this.vaccines = data.vaccines.map((vaccine: any) => ({ ...vaccine, isEditing: false }));
    });
  }

  startEdit(vaccine: any): void {
    vaccine.isEditing = true;
  }

  saveChanges(vaccine: any): void {
    // Assuming vaccine object has the same structure as the form
    const editedData = {
      vaccine_id:vaccine.vaccine_id,
      name: vaccine.name,
      company_name: vaccine.company_name,
      description: vaccine.description,
      quantity: vaccine.quantity,
      doses_required: vaccine.doses_required,
      on_hold_count:vaccine.on_hold_count
    };

    // Make API call to update the data
    const apiUrl = `api/updateVaccine/${vaccine.vaccine_id}`; // Update the URL
    this.vaccineService.updateVaccine(editedData).subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        this.vaccineService.getVaccines().subscribe({
          next: (data: any) => {
            this.vaccines = data.vaccines.map((vaccine: any) => ({ ...vaccine, isEditing: false }));
          },
          error: (error: any) => {
            console.error('Error fetching vaccines after update: ', error);
            // Handle error scenarios
          }
        });
      },
      error: (error: any) => {
        console.error('API error:', error);
        // Handle error scenarios
      }
    });
  }

  cancelEdit(vaccine: any): void {
    vaccine.isEditing = false;
  }

  viewVaccineDetails(vaccineId: number): void {
    // Handle navigation to the vaccine details page
    // You can use Angular Router for navigation
    console.log(`View details for vaccine with ID: ${vaccineId}`);
  }
}
