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
  isAdmin: boolean =false; // Added variable to track admin role

  constructor(
    private route: ActivatedRoute,
    private nurseService: NurseService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    // private authService: AuthService
  ) {
    this.editNurseForm = this.fb.group({
      email: [{ value: '', disabled: this.isAdmin }, Validators.required],

      first_name: [{ value: '', disabled: this.isAdmin }, Validators.required],
      middle_name: [{ value: '', disabled: this.isAdmin }],
      last_name: [{ value: '', disabled: this.isAdmin }, Validators.required],
      age: [{ value: '', disabled: this.isAdmin }, Validators.required],
      gender: [{ value: '', disabled: this.isAdmin }, Validators.required],
      phone_number: [{ value: '', disabled: this.isAdmin }, Validators.required],
      address: [{ value: '', disabled: this.isAdmin }, Validators.required],
      // Add other form controls...
    });


    //  this.authService.isAdmin(); // Modify this based on your AuthService logic
  }

  ngOnInit(): void {

    const val= localStorage.getItem('user');
    if (val !== null) {
      const userObject = JSON.parse(val);
console.log(userObject.role=='ADMIN');
      if(userObject.role=='ADMIN')
      {
        this.isAdmin=true;

      }
      else{
        this.isAdmin=false;
      }

      // Other operations with userObject or properties
  }

    this.route.params.subscribe(params => {
      this.nurseId = +params['id'];
      this.getNurseDetails();
    });
  }

  getNurseDetails() {
    this.nurseService.getNurseDetails(this.nurseId).subscribe(
      (data: any) => {
        this.nurseDetails = data.nurse;
        // Set initial values in the form
        this.editNurseForm.patchValue({
          first_name: this.nurseDetails.first_name,
          middle_name: this.nurseDetails.middle_name,
          last_name: this.nurseDetails.last_name,
          age: this.nurseDetails.age,
          gender: this.nurseDetails.gender,
          phone_number: this.nurseDetails.phone_number,
          address: this.nurseDetails.address,
          password: this.nurseDetails.password,
          email: this.nurseDetails.email,
          role_id: this.nurseDetails.role_id
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
        first_name: this.nurseDetails.first_name,
        middle_name: this.nurseDetails.middle_name,
        last_name: this.nurseDetails.last_name,
        age: this.nurseDetails.age,
        gender: this.nurseDetails.gender,
        phone_number: this.nurseDetails.phone_number,
        address: this.nurseDetails.address,
        password: this.nurseDetails.password,
        email: this.nurseDetails.email,
        role_id: this.nurseDetails.role_id
      });
    }
  }

  saveChanges() {
    // Fields that admin can edit
    const adminEditableFields = ['firstName', 'middle_name', 'last_name', 'age', 'gender', 'password', 'email', 'role_id','password','address'];

    // Fields that nurse can edit
    const nurseEditableFields = ['address', 'phone_number'];

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
