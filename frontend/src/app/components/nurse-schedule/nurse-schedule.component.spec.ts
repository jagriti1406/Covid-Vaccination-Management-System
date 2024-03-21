import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseScheduleComponent } from './nurse-schedule.component';

describe('NurseScheduleComponent', () => {
  let component: NurseScheduleComponent;
  let fixture: ComponentFixture<NurseScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NurseScheduleComponent]
    });
    fixture = TestBed.createComponent(NurseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
