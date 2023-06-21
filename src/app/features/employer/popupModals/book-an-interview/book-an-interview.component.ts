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
import { PhoneNumberInputComponent } from '@app/@shared/Forms/phone-number-input/phone-number-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-book-an-interview',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    FormsModule,
    ReactiveFormsModule,
    ReusableInputComponent,
    UserCardComponent,
    SelectInputComponent,
    TranslateModule,
    PhoneNumberInputComponent,
  ],
  templateUrl: './book-an-interview.component.html',
  styleUrls: ['./book-an-interview.component.scss'],
})
export class BookAnInterviewComponent implements OnInit {
  formStep1!: any;
  formStep2!: any;
  step = 1;
  jobTitle: string = 'NodeJS Developer';
  interviewTypeList = [
    { label: 'One on one', value: '1', data: { label: 'One on one' } },
    { label: 'Video', value: '2', data: { label: 'Video' } },
    { label: 'Phone', value: '3', data: { label: 'Phone' } },
    { label: 'Informal', value: '4', data: { label: 'Informal' } },
    { label: 'Group', value: '5', data: { label: 'Group' } },
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
      company: new FormControl('', Validators.required),
      contact: new FormGroup({
        phone: new FormControl('', Validators.required),
      }),
    });
    this.formStep2 = new FormGroup({
      interviewType: new FormControl('', Validators.required),
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.formStep1.valid) {
      console.log(this.formStep1.value);
      this.step = 2;
    } else {
      this.formStep1.markAllAsTouched();
      console.log(this.formStep1.value);
      debugger;

      // this.scrollToFirstInvalidControl();
    }
  }

  confirm() {
    // if (this.form.valid) {
    //   console.log(this.form.value);
    // } else {
    //   this.form.markAllAsTouched();
    //   this.scrollToFirstInvalidControl();
    // }

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
