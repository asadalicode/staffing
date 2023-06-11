import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMeAdditionalDetailsComponent } from './contact-me-additional-details.component';

describe('ContactMeAdditionalDetailsComponent', () => {
  let component: ContactMeAdditionalDetailsComponent;
  let fixture: ComponentFixture<ContactMeAdditionalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactMeAdditionalDetailsComponent]
    });
    fixture = TestBed.createComponent(ContactMeAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
