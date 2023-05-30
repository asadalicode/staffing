import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryGraphComponent } from './salary-graph.component';

describe('SalaryGraphComponent', () => {
  let component: SalaryGraphComponent;
  let fixture: ComponentFixture<SalaryGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryGraphComponent]
    });
    fixture = TestBed.createComponent(SalaryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
