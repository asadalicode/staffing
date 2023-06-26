import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reusable-input',
  templateUrl: './reusable-input.component.html',
  styleUrls: ['./reusable-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableInputComponent),
      multi: true,
    },
  ],
})
export class ReusableInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type = 'text';
  @Input() placeholder = 'text';
  @Input() control = new FormControl('');
  @Input() customValidator: any;

  errorMessages: Record<string, string> = {
    required: 'The field is required.',
    email: 'The e-mail is invalid.',
  };

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
    console.log(this.control);
    // this.control.setValidators(this.customValidator);
  }
}
