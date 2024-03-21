import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineRecordComponent } from './vaccine-record.component';

describe('VaccineRecordComponent', () => {
  let component: VaccineRecordComponent;
  let fixture: ComponentFixture<VaccineRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccineRecordComponent]
    });
    fixture = TestBed.createComponent(VaccineRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
