// view-nurses.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
// import { AddNurseDialogComponent } from '../add-nurse-dialog/add-nurse-dialog.component'; // Import AddNurseDialogComponent
import { NurseService } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-view-nurses',
  templateUrl: './view-nurses.component.html',
  styleUrls: ['./view-nurses.component.css']
})
export class ViewNursesComponent implements OnInit {
  nurses: any[] = [];
// Add this line in your component class
displayedColumns: string[] = ['nurse_id', 'first_name', 'middle_name', 'last_name', 'age', 'gender', 'phone_number', 'address', 'actions'];

  constructor(
    private router: Router,
    private nurseService: NurseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog
  ) { }

  ngOnInit(): void {
    this.getNurses();
  }

  getNurses() {
    this.nurseService.getNurses().subscribe(
      (data: any) => {
        this.nurses = data.nurses;
      },
      error => {
        console.error('Error fetching nurses: ', error);
      }
    );
  }

  viewNurseDetails(nurseId: number) {
    this.router.navigate(['/view-nurse-details', nurseId]);
  }

  openAddNurseDialog() {
    // const dialogRef = this.dialog.open(AddNurseDialogComponent, {
    //   width: '400px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Perform necessary actions after adding nurse
    //     this.getNurses(); // Refresh the nurse list
    //   }
    // });
  }

  deleteNurse(nurseId: number) {
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this nurse?', 'Delete', {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      // User clicked on 'Delete' in the snackbar
      this.nurseService.deleteNurse(nurseId).subscribe(
        () => {
          this.snackBar.open('Nurse deleted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          // Refresh the nurse list after deletion
          this.getNurses();
        },
        error => {
          console.error('Error deleting nurse: ', error);
        }
      );
    });
  }
}
