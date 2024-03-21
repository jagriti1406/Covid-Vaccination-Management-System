import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSlotsComponent } from './view-time-slots.component';

describe('ViewTimeSlotsComponent', () => {
  let component: ViewTimeSlotsComponent;
  let fixture: ComponentFixture<ViewTimeSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTimeSlotsComponent]
    });
    fixture = TestBed.createComponent(ViewTimeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
