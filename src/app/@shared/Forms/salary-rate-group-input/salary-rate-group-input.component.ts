import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectInputComponent } from '../select-input/select-input.component';

@Component({
  selector: 'app-salary-rate-group-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SelectInputComponent],
  templateUrl: './salary-rate-group-input.component.html',
  styleUrls: ['./salary-rate-group-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SalaryRateGroupInputComponent),
      multi: true,
    },
  ],
})
export class SalaryRateGroupInputComponent {

  currencyList = [
    { value: 'AUD', label: 'AUD', data: { label: 'AUD' } },
    { value: 'USD', label: 'USD', data: { label: ' USD' } },
    { value: 'PKR', label: 'PKR', data: { label: 'PKR' } },
  ];

  salaryTypeList = [
    { value: 'Annually', label: 'Annually', data: { label: 'Annually' } },
    { value: 'Hourly', label: 'Hourly', data: { label: 'Hourly' } },
  ];

  selectedCurrency = 'AUD';

  @Input() label!: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  // @Input() control = new FormControl('');
  @Input("formGroup") salaryRange!: FormGroup;
  @Input() customValidator: any;


  errorMessages: Record<string, string> = {
    required: 'The field is required.'
  }


  onCurrenyChange(event: any) {
    this.selectedCurrency = event.value;
  }
  onChange: ((value: any) => void) | undefined;
  onTouched!: () => void;

  writeValue(value: any) {
    this.salaryRange.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  ngOnInit() {
    console.log(this.salaryRange)
    // this.control.setValidators(this.customValidator);
  }
}
