import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseVaccinationRecordComponent } from './nurse-vaccination-record.component';

describe('NurseVaccinationRecordComponent', () => {
  let component: NurseVaccinationRecordComponent;
  let fixture: ComponentFixture<NurseVaccinationRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NurseVaccinationRecordComponent]
    });
    fixture = TestBed.createComponent(NurseVaccinationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
