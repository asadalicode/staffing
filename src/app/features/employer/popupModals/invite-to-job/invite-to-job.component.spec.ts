import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToJobComponent } from './invite-to-job.component';

describe('InviteToJobComponent', () => {
  let component: InviteToJobComponent;
  let fixture: ComponentFixture<InviteToJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InviteToJobComponent]
    });
    fixture = TestBed.createComponent(InviteToJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
