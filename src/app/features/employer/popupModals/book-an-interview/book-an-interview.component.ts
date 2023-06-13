import {
  NgxIntlTelInputModule,
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import { SelectInputComponent } from '@app/@shared/Forms/select-input/select-input.component';
import { ConfirmationPopupComponent } from '@app/@shared/components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-book-an-interview',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    FormsModule,
    ReactiveFormsModule,
    ReusableInputComponent,
    SelectInputComponent,
    NgxIntlTelInputModule,
  ],
  templateUrl: './book-an-interview.component.html',
  styleUrls: ['./book-an-interview.component.scss'],
})
export class BookAnInterviewComponent implements OnInit {
  formStep1!: any;
  formStep2!: any;
  step = 1;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  interviewTypeList = [
    { label: 'One on one', value: '1' },
    { label: 'Video', value: '2' },
    { label: 'Phone', value: '3' },
    { label: 'Informal', value: '4' },
    { label: 'Group', value: '5' },
  ];

  constructor(
    public dialogRef: MatDialogRef<BookAnInterviewComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formStep1 = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    this.formStep2 = new FormGroup({
      interviewType: new FormControl('', Validators.required),
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.step = 2;
  }

  confirm() {
    console.log(this.formStep2.value);
    this.dialogRef.close();
    this.openConfirmationPopup();
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        iconSrc: 'assets/icons/check.svg',
        title: `Interview booked successfully!`,
        titleClass: 'text-primary-dark px-3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet.`,
        descriptionClass: '!font-normal text-secondary-light !text-base',
        buttonText: 'Ok',
        buttonClass: 'btn-primary-lg self-center w-[242px]',
      },
      panelClass: ['popup-modal', 'xs'],
    });
  }
}
