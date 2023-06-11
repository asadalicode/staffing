import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAnInterviewComponent } from './book-an-interview.component';

describe('BookAnInterviewComponent', () => {
  let component: BookAnInterviewComponent;
  let fixture: ComponentFixture<BookAnInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookAnInterviewComponent]
    });
    fixture = TestBed.createComponent(BookAnInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
