import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTimeSlotsComponent } from './components/view-time-slots/view-time-slots.component';
import { ViewVaccinationScheduleComponent } from './components/view-vaccination-schedule/view-vaccination-schedule.component';
import { ViewNursesComponent } from './components/view-nurses/view-nurses.component';
import { VaccineListComponent } from './components/vaccine-list.component.ts/vaccine-list.component';
import { AppComponent } from './app.component';
import { AddVaccineComponent } from './components/add-vaccine/add-vaccine.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { AddNurseComponent } from './components/add-nurse/add-nurse.component';
import { AdminComponent } from './components/admin/admin.component';
import { NurseDetailsComponent } from './components/view-nurse-details/nurse-details.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { VaccineRecordComponent } from './components/vaccine-record/vaccine-record.component';
import { NurseScheduleComponent } from './components/nurse-schedule/nurse-schedule.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { PatientComponent } from './components/patient/patient.component';
import { ViewEditProfileComponent } from './components/view-edit-profile/view-edit-profile.component';
import { ScheduleVaccinationComponent } from './components/schedule-vaccination/schedule-vaccination.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [

  {path : '', redirectTo : '/app', pathMatch : 'full'},
  { path: 'app', component: AppComponent },
  { path: 'vaccine', component: VaccineComponent },
    { path: 'vaccine-info', component: VaccineListComponent },
    { path: 'register-nurse', component: AddNurseComponent },//add nurse
    { path: 'view-all-nurses', component: ViewNursesComponent },//admin view all nurses
    { path: 'view-nurse-details/:id', component: NurseDetailsComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'nurse', component: NurseComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'patient-dashboard', component: PatientComponent }, //to see patient buttons
    { path: 'patient/view-my-details/:id', component: ViewEditProfileComponent },//patyient profile
    { path: 'patient', component: PatientListComponent },
    { path: 'patient/schedule-vaccination/:id', component: ScheduleVaccinationComponent },//all patientsn for admin
    { path: 'patient-schedule/:id', component: ViewVaccinationScheduleComponent },//patient vaccination schedule for patient
    { path: 'vaccination-record/:nurseId', component: VaccineRecordComponent},//vaccination record for nurse
    { path: 'add-nurse-schedule/:nurseId', component: NurseScheduleComponent},//nurse schedule and book new schedule
    // { path: 'add-vaccine', component: AddVaccineComponent },
    // { path: 'view-patient-info', component: ViewPatientInfoComponent },
    // { path: 'view-nurse-info', component: ViewNurseInfoComponent },


    // Add a route for the "Add Vaccine Form" page
    { path: 'add-vaccine-form', component: AddVaccineComponent }, // Redirect to vaccine-info if the path is not recognized

  // {path : '', redirectTo : 'login', pathMatch : 'full'},

  // { path: 'view-time-slots', component: ViewTimeSlotsComponent },
  // { path: 'view-vaccination-schedule/:id', component: ViewVaccinationScheduleComponent },
  // { path: 'view-nurses', component: ViewNursesComponent },
  // { path: 'view-nurse-details/:id', component: ViewNurseDetailsComponent },

  // {path : 'dashboard', children :
  // [
  //   {path : '', redirectTo: 'patient', pathMatch: 'full'},
  //   {path : 'patient', component: PatientComponent},
  //   {path : 'doctor', component: DoctorComponent},
  //   {path : 'doctor/:id', component: ViewDoctorComponent},
  //   {path : 'patient/:id', component: ViewPatientComponent},
  // ], canActivate: [AuthguardGuard]},
  // {path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
