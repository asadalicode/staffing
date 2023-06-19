import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRateGroupInputComponent } from './salary-rate-group-input.component';

describe('SalaryRateGroupInputComponent', () => {
  let component: SalaryRateGroupInputComponent;
  let fixture: ComponentFixture<SalaryRateGroupInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SalaryRateGroupInputComponent]
    });
    fixture = TestBed.createComponent(SalaryRateGroupInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
