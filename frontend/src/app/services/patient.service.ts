// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:5000/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`);
  }
  createPatient(patientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/patients`, patientData);
  }

  getPatientProfile(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patients/${patientId}`);
  }

  updatePatientProfile(patientId: number, patientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/patients/${patientId}`, patientData);
  }

  getVaccinationSchedule(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vaccination-schedule/${patientId}`);
  }

  cancelVaccinationSchedule(scheduleId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cancel-vaccination-schedule/${scheduleId}`,{});
  }

  registerVaccinationSchedule(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patient/vaccination-schedule`, formData);
  }

}
