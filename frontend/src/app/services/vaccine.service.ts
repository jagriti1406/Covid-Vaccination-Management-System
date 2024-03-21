// vaccine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private baseUrl = 'http://127.0.0.1:5000'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getVaccines(): Observable<any> {
    const url = `${this.baseUrl}/api/vaccines`; // Replace with your API endpoint for fetching vaccines
    return this.http.get(url);
  }

  updateVaccine(vaccine: any): Observable<any> {
    console.log(vaccine.vaccine_id);
    const url = `${this.baseUrl}/api/vaccines/${vaccine.vaccine_id}`; // Replace with your API endpoint for updating a vaccine
    return this.http.put(url, vaccine);
  }

  addVaccine(vaccine: any): Observable<any> {
    const url = `${this.baseUrl}/api/vaccines`; // Replace with your API endpoint for adding a vaccine
    return this.http.post(url, vaccine);
  }
  // Add other methods as needed, such as fetching vaccine details
}
