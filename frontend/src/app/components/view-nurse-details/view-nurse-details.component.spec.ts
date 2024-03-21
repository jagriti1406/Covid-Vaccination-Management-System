import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNurseDetailsComponent } from './view-nurse-details.component';

describe('ViewNurseDetailsComponent', () => {
  let component: ViewNurseDetailsComponent;
  let fixture: ComponentFixture<ViewNurseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNurseDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewNurseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
