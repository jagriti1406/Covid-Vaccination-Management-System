// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000'; // Replace with your API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
isLoggedin=false;
  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  login(formData: any): Observable<any> {
    // Assume your backend API endpoint for login is /api/login
    return this.http
      .post(`${this.apiUrl}/api/login`, formData)
      .pipe(
        tap((user: any) => {
          // Assuming your backend returns the user object on successful login
          if (user) {
            this.setAuth(user);
            // this.router.navigate(['/']); // Navigate to the dashboard or any other route after successful login
          }
        }),
        catchError((error) => {
          this.handleSignupError(error);
          return throwError(error);
        })
      );
  }

  signup(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/signup`, formData)
      .pipe(
        tap((user: any) => {
          // Assuming your backend returns the user object on successful signup
          // if (user) {
          //   this.setAuth(user);
          // }
        }),
        catchError((error) => {
          // Handle signup error
          return throwError(error);
        })
      );
  }
  // signup( formdata:any): Observable<any>  {
  //   // Assume your backend API endpoint for signup is /api/signup
  //   this.http
  //     .post(`${this.apiUrl}/api/signup`, formdata)
  //     .pipe(
  //       tap((user: any) => {
  //         // Assuming your backend returns the user object on successful signup

  //         if (user) {
  //           this.setAuth(user);
  //           // this.router.navigate(['/dashboard']); // Navigate to the dashboard or any other route after successful signup
  //         }
  //         // return user;
  //       },
  //       catchError((error) => {
  //         this.handleSignupError(error);
  //         return throwError(error);
  //       })
  //     ));

  // }
  private handleSignupError(error: any): void {
    if (error.status === 400) {
      this.showSnackbar('Invalid signup data. Please check your inputs.');
    } else if (error.status === 401) {

      this.showSnackbar('Unauthorized. Please check your credentials.');
    } else {
      this.showSnackbar('An error occurred during signup. Please try again.');
    }
    // Handle other error cases if needed
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  logout(): void {
    // Clear authentication details
    this.clearAuth();
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }

  private setAuth(user: any): void {
    // Store authentication details in local storage or cookies
    localStorage.setItem('user', JSON.stringify(user));

    this.isLoggedin=true;
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuth(): void {
    // Remove authentication details from local storage or cookies
    localStorage.removeItem('user');
    this.isLoggedin=false;
    this.isAuthenticatedSubject.next(false);
  }

  // Additional methods for checking authentication status, fetching user details, etc.
}
