import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberInputComponent } from './phone-number-input.component';

describe('PhoneNumberInputComponent', () => {
  let component: PhoneNumberInputComponent;
  let fixture: ComponentFixture<PhoneNumberInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhoneNumberInputComponent]
    });
    fixture = TestBed.createComponent(PhoneNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
