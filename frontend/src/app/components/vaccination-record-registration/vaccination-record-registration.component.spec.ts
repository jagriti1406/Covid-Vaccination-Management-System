import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationRecordRegistrationComponent } from './vaccination-record-registration.component';

describe('VaccinationRecordRegistrationComponent', () => {
  let component: VaccinationRecordRegistrationComponent;
  let fixture: ComponentFixture<VaccinationRecordRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationRecordRegistrationComponent]
    });
    fixture = TestBed.createComponent(VaccinationRecordRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
