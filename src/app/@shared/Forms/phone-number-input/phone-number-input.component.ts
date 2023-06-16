import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone-number-input',
  standalone: true,
  imports: [CommonModule, NgxIntlTelInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss']
})
export class PhoneNumberInputComponent {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO
  PhoneNumberFormat = PhoneNumberFormat.National;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
    CountryISO.Australia,
    CountryISO.Canada
  ];

  @Input() label!: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  // @Input() control = new FormControl('');
  @Input("formGroup") contact!: FormGroup;
  @Input() customValidator: any;


  errorMessages: Record<string, string> = {
    required: 'The field is required.'
  }


  onChange: ((value: any) => void) | undefined;
  onTouched!: () => void;

  writeValue(value: any) {
    this.contact.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  ngOnInit() {
    console.log(this.contact)
    // this.control.setValidators(this.customValidator);
  }
}
