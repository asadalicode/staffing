import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowIWorkComponent } from './how-i-work.component';

describe('HowIWorkComponent', () => {
  let component: HowIWorkComponent;
  let fixture: ComponentFixture<HowIWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HowIWorkComponent]
    });
    fixture = TestBed.createComponent(HowIWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
