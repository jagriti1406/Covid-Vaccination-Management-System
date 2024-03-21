import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isAuthenticated = false;
  currentUserRole:any;
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {

    // this.router.navigate(['signup']);
    // this.router.navigate(['patient-dashboard']);
    // this.router.navigate(['nurse']);
    // this.router.navigate(['admin']);
    this.redirectToUrl();

  }
  redirectToUrl(){
   if(!this.isUserLoggedIn()){
      this.router.navigate(['/login']);
    }
    else if(this.isUserLoggedIn() ){
      this.currentUserRole= localStorage.getItem('user');
      if(this.currentUserRole)
      {
      console.log(this.currentUserRole);
      this.currentUserRole=JSON.parse(this.currentUserRole);
      console.log(this.currentUserRole.role)
      if(this.currentUserRole.role=='NURSE')
      {
        this.router.navigate(['/nurse']);
      }
      else if(this.currentUserRole.role=='PATIENT')
      {
        this.router.navigate(['/patient-dashboard']);
      }
      else if(this.currentUserRole.role=='ADMIN'){
        this.router.navigate(['/admin']);
      }
    }
    else{
      this.router.navigate(['/login']);
    }
    }

  }
  isUserLoggedIn(): boolean {
    // Implement a method in your AuthService to check if the user is logged in
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

    });
    return this.isAuthenticated;
  }
}
