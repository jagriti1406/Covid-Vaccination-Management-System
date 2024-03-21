import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaccinationScheduleComponent } from './view-vaccination-schedule.component';

describe('ViewVaccinationScheduleComponent', () => {
  let component: ViewVaccinationScheduleComponent;
  let fixture: ComponentFixture<ViewVaccinationScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVaccinationScheduleComponent]
    });
    fixture = TestBed.createComponent(ViewVaccinationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
