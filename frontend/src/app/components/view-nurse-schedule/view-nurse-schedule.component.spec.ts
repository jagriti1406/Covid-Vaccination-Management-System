import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNurseScheduleComponent } from './view-nurse-schedule.component';

describe('ViewNurseScheduleComponent', () => {
  let component: ViewNurseScheduleComponent;
  let fixture: ComponentFixture<ViewNurseScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNurseScheduleComponent]
    });
    fixture = TestBed.createComponent(ViewNurseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
