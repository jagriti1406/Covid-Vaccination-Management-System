import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurseDialogComponent } from './add-nurse-dialog.component';

describe('AddNurseDialogComponent', () => {
  let component: AddNurseDialogComponent;
  let fixture: ComponentFixture<AddNurseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNurseDialogComponent]
    });
    fixture = TestBed.createComponent(AddNurseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
