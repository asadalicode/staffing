import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReusableInputComponent],
  templateUrl: './contact-me-additional-details.component.html',
  styleUrls: ['./contact-me-additional-details.component.scss']
})
export class ContactMeAdditionalDetailsComponent implements OnInit {
  form!: any;

  salaryTypeList = [
    { value: 'Annualy', label: 'Annualy' },
    { value: 'Hourly', label: 'Hourly' }
  ];

  jobTypeList = [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Remote Job', label: 'Remote Job' }
  ];

  currencyList = [
    {value: 'AUD', label: 'AUD'},
    {value: 'USD', label: 'USD'},
    {value: 'PKR', label: 'PKR'},
  ]

  constructor(
    public dialogRef: MatDialogRef<ContactMeAdditionalDetailsComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      jobType: new FormControl('', Validators.required),
      locationType: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      currency: new FormControl('AUD', Validators.required),
      salaryType: new FormControl('Annualy', Validators.required),
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
