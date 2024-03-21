// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private snackBar: MatSnackBar,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (user: any) => {
          // Handle successful signup
          console.log('Signin successful', user);
          this.snackBar.open('Sign In successful', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.loginForm.reset();
          // Perform additional actions or navigate to another page
          this.router.navigate(['/']);
        },
        (error: any) => {
          // Handle signup error
          this.snackBar.open('Credentials not correct, try again', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          console.error('Signup error', error);
          // Display an error message or perform other error handling
        }
      );
    };
 }
}


