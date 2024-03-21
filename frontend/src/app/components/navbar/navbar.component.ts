import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'path-to-your-auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService,private router: Router) {}
  isAuthenticated = false;
  currentUserRole:any;
  ngOnInit(): void {
    this.redirectToUrl();
  }

  isUserLoggedIn(): boolean {
    // Implement a method in your AuthService to check if the user is logged in
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

    });
    return this.isAuthenticated;
  }
  gotosignup(){
    this.router.navigate(['/signup']);
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

    }

   }
  gotologin(){
    this.router.navigate(['/login']);
  }
  dashboard():void{
    this.router.navigate(['/']);
    }
  logout(): void {
    // Implement logout logic in your AuthService

    this.authService.logout();
  }
}
