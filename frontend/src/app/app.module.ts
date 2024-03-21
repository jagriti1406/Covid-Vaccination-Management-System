import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientComponent } from './components/patient/patient.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientService } from './services/patient.service';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewEditProfileComponent } from './components/view-edit-profile/view-edit-profile.component';
import { ViewTimeSlotsComponent } from './components/view-time-slots/view-time-slots.component';
import { ViewVaccinationScheduleComponent } from './components/view-vaccination-schedule/view-vaccination-schedule.component';
import { ViewNursesComponent } from './components/view-nurses/view-nurses.component';
import { NurseDetailsComponent } from './components/view-nurse-details/nurse-details.component';
// import { AddNurseDialogComponent } from './components/add-nurse-dialog/add-nurse-dialog.component';
import { NurseScheduleComponent } from './components/nurse-schedule/nurse-schedule.component';
import { NurseVaccinationRecordComponent } from './components/nurse-vaccination-record/nurse-vaccination-record.component';
import { VaccinationRecordRegistrationComponent } from './components/vaccination-record-registration/vaccination-record-registration.component';
import { VaccineListComponent } from './components/vaccine-list.component.ts/vaccine-list.component';
import { AddVaccineComponent } from './components/add-vaccine/add-vaccine.component';

import { MatCardModule } from '@angular/material/card';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddNurseComponent } from './components/add-nurse/add-nurse.component';
import { ViewNurseScheduleComponent } from './components/view-nurse-schedule/view-nurse-schedule.component';
import { VaccineRecordComponent } from './components/vaccine-record/vaccine-record.component';
// import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { ScheduleVaccinationComponent } from './components/schedule-vaccination/schedule-vaccination.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    NurseComponent,
    PatientListComponent,
    CreatePatientComponent,
    ViewEditProfileComponent,
    ViewTimeSlotsComponent,
    ViewVaccinationScheduleComponent,
    ViewNursesComponent,
    NurseDetailsComponent,
    // AddNurseDialogComponent,
    NurseScheduleComponent,
    NurseVaccinationRecordComponent,
    VaccinationRecordRegistrationComponent,
    VaccineListComponent,
    AddVaccineComponent,
    VaccineComponent,
    AdminComponent,
    AddNurseComponent,
    ViewNurseScheduleComponent,
    VaccineRecordComponent,
    // VaccineFormComponent,
    ScheduleVaccinationComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,

  ],
  imports: [
    // MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    LayoutModule,
    MatIconModule,
    // MatToolbarModule,

    MatDialogModule,
    // MatDialogContent,
    MatButtonModule,

    MatSidenavModule,
    // MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    // MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    // MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [PatientService],
  exports:[
    // MaterialModule,
     BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
