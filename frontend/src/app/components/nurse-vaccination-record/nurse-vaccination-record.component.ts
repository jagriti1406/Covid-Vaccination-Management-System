// nurse-vaccination-record.component.ts
import { Component, OnInit } from '@angular/core';
// import { VaccinationRecordService } from 'path-to-your-service'; // Import your service
import { NurseService } from 'src/app/services/nurse.service';
@Component({
  selector: 'app-nurse-vaccination-record',
  templateUrl: './nurse-vaccination-record.component.html',
  styleUrls: ['./nurse-vaccination-record.component.css']
})
export class NurseVaccinationRecordComponent implements OnInit {
  vaccinationRecords: any[] = []; // Array to hold vaccination records

  constructor(private nurseService: NurseService) {}

  ngOnInit(): void {
    this.fetchVaccinationRecords();
  }

  fetchVaccinationRecords() {
    // Assuming you have a method in your service to get vaccination records
    this.nurseService.getVaccinationRecords().subscribe(
      (data: any) => {
        this.vaccinationRecords = data.records;
      },
      (error:any) => {
        console.error('Error fetching vaccination records: ', error);
      }
    );
  }
}
