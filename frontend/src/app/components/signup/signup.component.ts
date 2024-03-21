// signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { SignupService } from '../services/signup.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar,private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role_type: ['Patient', Validators.required], // Default role is 'patient'
      ssn: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      race: [''],
      occupation_class: [''],
      medical_history_description: [''],
      phone_number: [''],
      address: [''],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(
        (user: any) => {
          // Handle successful signup
          console.log('Signup successful', user);
          this.snackBar.open('Signup successful,now login with the credentials you just creater', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.signupForm.reset();
          // Perform additional actions or navigate to another page
          this.router.navigate(['/login']);
        },
        (error: any) => {
          // Handle signup error
          this.snackBar.open('There is some problem', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          console.error('Signup error', error);
          // Display an error message or perform other error handling
        }
      );
    }
  }

}
