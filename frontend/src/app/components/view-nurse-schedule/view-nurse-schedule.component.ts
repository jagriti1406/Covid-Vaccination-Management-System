import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';
// import { NurseScheduleService } from 'path-to-your-service'; // Update with the correct path

@Component({
  selector: 'app-view-nurse-schedule',
  templateUrl: './view-nurse-schedule.component.html',
  styleUrls: ['./view-nurse-schedule.component.css']
})
export class ViewNurseScheduleComponent implements OnInit {
  nurseSchedules: any[] = []; // Update the type based on your data structure
  nurseId!: number;
  @Input() nurseIdinput: number | undefined;
  displayedColumns: string[] = ['date', 'end_time', 'max_patient_capacity', 'nurse_count', 'start_time'];
  constructor(
    private route: ActivatedRoute,
    private nurseScheduleService: NurseService
  ) { }

  ngOnInit(): void {
    if(this.nurseIdinput){
 this.nurseId=this.nurseIdinput;
    }
    else{
      this.route.params.subscribe(params => {
        this.nurseId = +params['id']; // Assuming your route has 'id' parameter

      });
    }
    this.getNurseSchedules();

  }

  getNurseSchedules() {
    this.nurseScheduleService.getNurseSchedules(this.nurseId).subscribe({
      next: (data: any) => {
        
        console.log("here");
        console.log(data);
        this.nurseSchedules = data.nurse_schedule;
      },
      error: (error: any) => {
        console.error('Error fetching nurse schedules: ', error);
      }
    });

  }
}
