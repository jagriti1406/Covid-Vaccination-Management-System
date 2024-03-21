// view-edit-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
// import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-view-edit-profile',
  templateUrl: './view-edit-profile.component.html',
  styleUrls: ['./view-edit-profile.component.css']
})
export class ViewEditProfileComponent implements OnInit {
  patientId!: number;
  patientProfileForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit(): void {
    // this.patientId = +this.route.snapshot.paramMap.get('id');
    this.patientId = 1;
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];

    });
    this.createForm();
    this.getPatientProfile();
  }

  createForm() {

    this.patientProfileForm = this.fb.group({
      ssn: [{ value: '', disabled: true }],
      first_name: [{ value: '', disabled: !this.isEditMode  }, Validators.required],
      middle_name: [{ value: '', disabled:!this.isEditMode  }],
      last_name: [{ value: '', disabled: !this.isEditMode }, Validators.required],
      age: [{ value: '', disabled:!this.isEditMode }, [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: [{ value: '', disabled: !this.isEditMode  }, Validators.required],
      race: [{ value: '', disabled: !this.isEditMode  }],
      occupation_class: [{ value: '', disabled: !this.isEditMode  }],
      medical_history_description: [{ value: '', disabled: !this.isEditMode }],
      phone_number: [{ value: '', disabled: !this.isEditMode  }, [Validators.pattern('^[0-9]*$')]],
      address: [{ value: '', disabled:!this.isEditMode  }],
    });
  }

  getPatientProfile() {

    this.patientService.getPatientProfile(this.patientId).subscribe(
      (data: any) => {
        this.patientProfileForm.patchValue(data);
      },
      (error:any)=> {
        console.error('Error fetching patient profile: ', error);
      }
    );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.patientProfileForm.enable();
    } else {
      this.patientProfileForm.disable();
      this.updatePatientProfile();
    }
  }

  updatePatientProfile() {
    console.log("here");

      console.log("there");
      this.patientService.updatePatientProfile(this.patientId, this.patientProfileForm.value).subscribe(
        (data: any) => {
          console.log('Patient profile updated successfully: ', data);
        },
        (error:any)=> {
          console.error('Error updating patient profile: ', error);
        }
      );

  }
}
