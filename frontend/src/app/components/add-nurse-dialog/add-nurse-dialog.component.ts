// add-nurse-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-nurse-dialog',
  templateUrl: './add-nurse-dialog.component.html',
  styleUrls: ['./add-nurse-dialog.component.css']
})
export class AddNurseDialogComponent implements OnInit {
  addNurseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNurseDialogComponent>
  ) {
    this.addNurseForm = this.fb.group({
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
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // You can access the form values using this.addNurseForm.value
    // Perform necessary actions, e.g., send data to the server
    this.dialogRef.close(this.addNurseForm.value);
  }
}
