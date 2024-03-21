// vaccine-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { TimeSlotService } from 'src/app/services/time-slot.service';
import { VaccineService } from 'src/app/services/vaccine.service';
// import { VaccineService } from 'path-to-your-vaccine-service'; // Update with the correct path
// import { TimeSlotService } from 'path-to-your-time-slot-service'; // Update with the correct path

@Component({
  selector: 'app-schedule-vaccination',
  templateUrl: './schedule-vaccination.component.html',
  styleUrls: ['./schedule-vaccination.component.css']
})
export class ScheduleVaccinationComponent implements OnInit {
  vaccineForm: FormGroup;
  vaccines: any[] = []; // Replace with the actual data type
  timeSlots: any[] = []; // Replace with the actual data type
  patientId!: number;
  constructor(
    private fb: FormBuilder,
    private vaccineService: VaccineService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private timeSlotService: TimeSlotService
  ) {
    this.vaccineForm = this.fb.group({
      vaccine: ['', Validators.required],
      timeSlot: ['', Validators.required],
      doseNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.patientId = 1;
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];

    });
    // Fetch vaccine options
    this.vaccineService.getVaccines().subscribe((data: any) => {
      this.vaccines = data.vaccines; // Update with your actual property
    });

    // Fetch time slot options
    this.timeSlotService.getTimeSlotsPatients().subscribe((data: any) => {
      this.timeSlots = data.timeslots; // Update with your actual property
    });
  }

  onSubmit() {
    // Handle form submission
    const formData = {
      'dose_no':this.vaccineForm.value.doseNumber,
      'patient_id':this.patientId,
      'vaccine_id':this.vaccineForm.value.vaccine,
      'time_slot_id':this.vaccineForm.value.timeSlot

    }
    this.patientService.registerVaccinationSchedule(formData).subscribe(
      (data: any) => {
        console.log('Vaccine Scheduled successfuly ', data);
      },
      (error:any)=> {
        console.error('Error updating vaccine schedule ', error);
      }
    );

    console.log(formData);

    // Add your logic for submitting the form data (e.g., calling an API)
  }
}
