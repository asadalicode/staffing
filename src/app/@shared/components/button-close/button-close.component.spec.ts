import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCloseComponent } from './button-close.component';

describe('ButtonCloseComponent', () => {
  let component: ButtonCloseComponent;
  let fixture: ComponentFixture<ButtonCloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonCloseComponent]
    });
    fixture = TestBed.createComponent(ButtonCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
