import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensionPanelComponent } from './expension-panel.component';

describe('ExpensionPanelComponent', () => {
  let component: ExpensionPanelComponent;
  let fixture: ComponentFixture<ExpensionPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpensionPanelComponent]
    });
    fixture = TestBed.createComponent(ExpensionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
