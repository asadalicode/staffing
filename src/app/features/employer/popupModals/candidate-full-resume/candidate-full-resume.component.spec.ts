import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFullResumeComponent } from './candidate-full-resume.component';

describe('CandidateFullResumeComponent', () => {
  let component: CandidateFullResumeComponent;
  let fixture: ComponentFixture<CandidateFullResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateFullResumeComponent]
    });
    fixture = TestBed.createComponent(CandidateFullResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
