// time-slot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  private apiUrl = 'http://127.0.0.1:5000/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getTimeSlots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/timeslots/available`);
  }
  getTimeSlotsPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/timeslots/patients/available`);
  }
}
