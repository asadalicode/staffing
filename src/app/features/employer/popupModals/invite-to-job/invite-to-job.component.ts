import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectInputComponent } from '@app/@shared/Forms/select-input/select-input.component';
import { ConfirmationPopupComponent } from '@app/@shared/components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-invite-to-job',
  standalone: true,
  imports: [CommonModule, ButtonCloseComponent, FormsModule, ReactiveFormsModule,
   SelectInputComponent, ReusableInputComponent],
  templateUrl: './invite-to-job.component.html',
  styleUrls: ['./invite-to-job.component.scss']
})
export class InviteToJobComponent implements OnInit {

  formStep1!: any;
  formStep2!: any;
  formStep3!: any;
  formStep5!: any;
  step = 1;
  selectedJobType = '';
  selectedCurrency = '';
  salaryTypeList = [
    { value: 'Annualy', label: 'Annualy' },
    { value: 'Hourly', label: 'Hourly' }
  ];

  locationType = [
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Remote', label: 'Remote' }
  ]

  jobTypeList = [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Contract', label: 'Contract' }
  ];

  currencyList = [
    { value: 'AUD', label: 'AUD' },
    { value: 'USD', label: 'USD' },
    { value: 'PKR', label: 'PKR' },
  ]

  constructor(
    public dialogRef: MatDialogRef<InviteToJobComponent>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formStep1 = new FormGroup({
      firstName: new FormControl('asad', Validators.required),
      lastName: new FormControl('ali', Validators.required),
      email: new FormControl('asad@gmail.com', Validators.required),
      phone: new FormControl('0304334432', Validators.required),
    });


    this.formStep2 = new FormGroup({
      roleTitle: new FormControl('Developer', Validators.required),
      companyName: new FormControl('Remote', Validators.required),
      location: new FormControl('pakistan', Validators.required),
    });


    this.formStep3 = new FormGroup({
      jobType: new FormControl('', Validators.required),
      locationType: new FormControl('', Validators.required), 
      date: new FormControl('', Validators.required),
      currency: new FormControl('AUD', Validators.required),
      salaryType: new FormControl('Annualy', Validators.required),
      salaryStart: new FormControl('', Validators.required),
      salaryEnd: new FormControl('', Validators.required),
    });
    
    this.formStep5 = new FormGroup({
      currency: new FormControl('AUD', Validators.required),
      salaryType: new FormControl('Annualy', Validators.required),
      salaryStart: new FormControl('', Validators.required),
      salaryEnd: new FormControl('', Validators.required),
    }); 
  }

  next() {
    this.step += 1;
  }
  prev() {
    this.step -= 1;
  }
  close() {
    this.dialogRef.close()
  }


  sendInvite() {
    this.close();
    this.openConfirmationPopup()
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        iconSrc: 'assets/icons/check.svg',
        title: `Job invite sent successfully!`,
        titleClass: 'text-primary-dark px-5',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet.`,
        descriptionClass: '!font-normal text-secondary-light !text-base',
        buttonText: 'Ok',
        buttonClass: 'btn-primary-lg self-center w-[242px]',
      },
      panelClass: ['popup-modal', 'xs'],
    });
  }

  onJobTypeChange(event:any) {
    this.selectedJobType = event.value;
  }
  onCurrenyChange(event: any) {
    this.selectedCurrency = event.value;
  }
}
