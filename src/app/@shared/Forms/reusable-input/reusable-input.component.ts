import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reusable-input',
  templateUrl: './reusable-input.component.html',
  styleUrls: ['./reusable-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableInputComponent),
      multi: true
    }
  ]
})

export class ReusableInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type = 'text';
  @Input() control: any;
  @Input() customValidator: any;

  onChange: ((value: any) => void) | undefined;
  onTouched!: () => void;

  writeValue(value: any) {
    this.control.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.control.setValidators(this.customValidator);
  }

}
