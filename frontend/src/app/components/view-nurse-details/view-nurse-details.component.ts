// nurse-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from 'src/app/services/auth.service'; // Assuming AuthService provides information about the user's role

@Component({
  selector: 'app-nurse-details',
  templateUrl: './nurse-details.component.html',
  styleUrls: ['./nurse-details.component.css']
})
export class NurseDetailsComponent implements OnInit {
  nurseId!: number;
  nurseDetails: any;
  editNurseForm: FormGroup;
  isEditMode: boolean = false; // Added variable to track edit mode
  isAdmin: boolean = false; // Added variable to track admin role

  constructor(
    private route: ActivatedRoute,
    private nurseService: NurseService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    // private authService: AuthService
  ) {
    this.editNurseForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required]
    });

    this.isAdmin =true;
    //  this.authService.isAdmin(); // Modify this based on your AuthService logic
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nurseId = +params['id'];
      this.getNurseDetails();
    });
  }

  getNurseDetails() {
    this.nurseService.getNurseDetails(this.nurseId).subscribe(
      (data: any) => {
        this.nurseDetails = data;
        // Set initial values in the form
        this.editNurseForm.patchValue({
          firstName: this.nurseDetails.firstName,
          middleName: this.nurseDetails.middleName,
          lastName: this.nurseDetails.lastName,
          age: this.nurseDetails.age,
          gender: this.nurseDetails.gender,
          phoneNumber: this.nurseDetails.phoneNumber,
          address: this.nurseDetails.address,
          password: this.nurseDetails.password,
          email: this.nurseDetails.email,
          roleId: this.nurseDetails.roleId
        });
      },
      error => {
        console.error('Error fetching nurse details: ', error);
      }
    );
  }

  // Toggle edit mode
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    // Reset form values when exiting edit mode
    if (!this.isEditMode) {
      this.editNurseForm.reset({
        firstName: this.nurseDetails.firstName,
        middleName: this.nurseDetails.middleName,
        lastName: this.nurseDetails.lastName,
        age: this.nurseDetails.age,
        gender: this.nurseDetails.gender,
        phoneNumber: this.nurseDetails.phoneNumber,
        address: this.nurseDetails.address,
        password: this.nurseDetails.password,
        email: this.nurseDetails.email,
        roleId: this.nurseDetails.roleId
      });
    }
  }

  saveChanges() {
    // Fields that admin can edit
    const adminEditableFields = ['firstName', 'middleName', 'lastName', 'age', 'gender', 'password', 'email', 'roleId'];

    // Fields that nurse can edit
    const nurseEditableFields = ['address', 'phoneNumber'];

    const editableFields = this.isAdmin ? adminEditableFields : nurseEditableFields;

    const updatedNurseDetails = {};

    // editableFields.forEach(field => {
    //   updatedNurseDetails[field] = this.editNurseForm.value[field];
    // });

    this.nurseService.updateNurseDetails(this.nurseId, this.editNurseForm.value).subscribe(
      () => {
        this.snackBar.open('Nurse details updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        // Refresh the nurse details
        this.getNurseDetails();
        // Exit edit mode
        this.toggleEditMode();
      },
      error => {
        console.error('Error updating nurse details: ', error);
      }
    );
  }
}
