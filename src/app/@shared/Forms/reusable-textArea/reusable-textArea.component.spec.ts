import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTextAreaComponent } from './reusable-textArea.component';

describe('ReusableTextAreaComponent', () => {
  let component: ReusableTextAreaComponent;
  let fixture: ComponentFixture<ReusableTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableTextAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
