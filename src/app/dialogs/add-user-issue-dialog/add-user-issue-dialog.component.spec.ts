import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserIssueDialogComponent } from './add-user-issue-dialog.component';

describe('AddPersonIssueComponent', () => {
  let component: AddUserIssueDialogComponent;
  let fixture: ComponentFixture<AddUserIssueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserIssueDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
