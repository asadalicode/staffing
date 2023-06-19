import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '@app/@shared/components/confirmation-popup/confirmation-popup.component';
import { SelectInputComponent } from '@app/@shared/Forms/select-input/select-input.component';

@Component({
  selector: 'app-contact-me-additional-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectInputComponent,
    ReusableInputComponent,
  ],
  templateUrl: './contact-me-additional-details.component.html',
  styleUrls: ['./contact-me-additional-details.component.scss'],
})
export class ContactMeAdditionalDetailsComponent implements OnInit {
  form!: any;

  salaryTypeList = [
    { value: 'Annually', label: 'Annually', data: { label: 'Annually' } },
    { value: 'Hourly', label: 'Hourly', data: { label: 'Hourly' } },
  ];

  locationTypeList = [
    { value: 'Hybrid', label: 'Hybrid', data: { label: 'Hybrid' } },
    { value: 'Remote', label: 'Remote', data: { label: 'Remote' } },
  ];

  jobTypeList = [
    { value: 'Full Time', label: 'Full Time', data: { label: 'Full Time' } },
    { value: 'Part Time', label: 'Part Time', data: { label: 'Part Time' } },
    { value: 'Casual', label: 'Casual', data: { label: 'Casual' } },
    { value: 'Contract', label: 'Contract', data: { label: 'Contract' } },
  ];

  currencyList = [
    { value: 'AUD', label: 'AUD', data: { label: 'AUD' } },
    { value: 'USD', label: 'USD', data: { label: ' USD' } },
    { value: 'PKR', label: 'PKR', data: { label: 'PKR' } },
  ];

  constructor(
    public dialogRef: MatDialogRef<ContactMeAdditionalDetailsComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      jobType: new FormControl('', Validators.required),
      locationType: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      currency: new FormControl('AUD', Validators.required),
      salaryType: new FormControl('Annually', Validators.required),
      salaryStart: new FormControl('', Validators.required),
      salaryEnd: new FormControl('', Validators.required),
    });
  }

  submit() {
    this.dialogRef.close('yes');
    this.openConfirmationPopup();
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        iconSrc: 'assets/icons/check.svg',
        title: `Thanks for the additional details {first name}! `,
        titleClass: 'text-primary-dark',
        description: `I'll call you soon to discuss your role and how I can help fill it.`,
        descriptionClass: '!font-normal text-secondary-light !text-base',
        buttonText: 'Ok',
        buttonClass: 'btn-primary-lg',
      },
      panelClass: ['popup-modal', 'md'],
    });
  }

  close() {
    this.dialogRef.close();
  }
}
