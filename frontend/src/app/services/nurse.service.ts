// nurse.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  private apiUrl = 'http://127.0.0.1:5000/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getNurses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nurses`);
  }
  addNurse(nurseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nurses`, nurseData);
  }

  deleteNurse(nurseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/nurses/${nurseId}`);
  }
  getNurseDetails(nurseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nurses/${nurseId}`);
  }

  updateNurseDetails(nurseId: number, updatedDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/nurses/${nurseId}`, updatedDetails);
  }
  getAvailableTimeSlots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/timeslots/available`);
  }
  getNurseSchedules(nurseId:any): Observable<any> {
    const url = `${this.apiUrl}/nurse-schedule/${nurseId}`; // Replace with your API endpoint for nurse schedules
    return this.http.get(url);
  }
  getVaccinationRecords(): Observable<any> {
    const url = `${this.apiUrl}/vaccination-records`; // Replace with your API endpoint for vaccination records
    return this.http.get(url);
  }
  cancelNurseSchedule(scheduleId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/nurse/nurse-schedule/${scheduleId}`);

  }
  registerNurseSchedule(data: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/nurse-schedule/register`, data).subscribe({
        next: response => {
          observer.next(response);
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
    });
  }

  getVaccinationSchedulesByTimeSlotId(timeSlotId: number): Observable<any> {
    // Implement the API call to fetch vaccination schedules by time slot id
    const url = `${this.apiUrl}/vaccination-schedules/${timeSlotId}`;
    return this.http.get(url);
  }

  registerVaccinationRecord(data: any): Observable<any> {
    const url = `${this.apiUrl}/record-vaccination`; // Update with your actual endpoint
    return this.http.post(url, data);
  }


}
