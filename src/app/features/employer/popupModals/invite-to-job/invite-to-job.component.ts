import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectInputComponent } from '@app/@shared/Forms/select-input/select-input.component';
import { ConfirmationPopupComponent } from '@app/@shared/components/confirmation-popup/confirmation-popup.component';
import { PhoneNumberInputComponent } from '@app/@shared/Forms/phone-number-input/phone-number-input.component';
import { SalaryRateGroupInputComponent } from '@app/@shared/Forms/salary-rate-group-input/salary-rate-group-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { ReusableTextAreaComponent } from '@app/@shared/Forms/reusable-textArea/reusable-textArea.component';
import { EmployerService } from '../../employer.service';
import { ApiService } from '@app/@shared/service/api.service';
import { ContactFormModel } from '@app/@shared/dataModels';

@Component({
  selector: 'app-invite-to-job',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    FormsModule,
    ReactiveFormsModule,
    UserCardComponent,
    PhoneNumberInputComponent,
    SelectInputComponent,
    ReusableInputComponent,
    ReusableTextAreaComponent,
    TranslateModule,
    SalaryRateGroupInputComponent,
  ],
  templateUrl: './invite-to-job.component.html',
  styleUrls: ['./invite-to-job.component.scss'],
})
export class InviteToJobComponent implements OnInit {
  formStep1!: any;
  formStep2!: any;
  formStep3!: any;
  formStep5!: any;
  step = 1;
  selectedJobType = '';
  selectedCurrency = '';
  jobTitle: string = 'NodeJS Developer';
  JobInformation!: any;
  salaryTypeList = [
    { value: 'Annually', label: 'Annually', data: { label: 'Annually' } },
    { value: 'Hourly', label: 'Hourly', data: { label: 'Hourly' } },
  ];

  locationType = [
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
    public dialogRef: MatDialogRef<InviteToJobComponent>,
    public dialog: MatDialog,
    private apiService: ApiService,
    public employerService: EmployerService
  ) {
    this.formStep1 = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      contact: new FormGroup({
        phone: new FormControl('', Validators.required),
      }),
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
      salaryRange: new FormGroup({
        currency: new FormControl('AUD', Validators.required),
        salaryType: new FormControl('Annually', Validators.required),
        salaryStart: new FormControl('', Validators.required),
        salaryEnd: new FormControl('', Validators.required),
      }),
    });

    this.formStep5 = new FormGroup({
      currency: new FormControl('AUD', Validators.required),
      salaryType: new FormControl('Annually', Validators.required),
      salaryStart: new FormControl('', Validators.required),
      salaryEnd: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.employerService.getJobInformation().subscribe((res) => {
      this.JobInformation = res;
      this.getContactFormData();
    });
  }

  next() {
    this.step += 1;
  }
  prev() {
    this.step -= 1;
  }
  close() {
    this.dialogRef.close();
  }

  sendInvite() {
    this.close();
    this.openConfirmationPopup();
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

  onJobTypeChange(event: any) {
    this.selectedJobType = event.value;
  }
  onCurrenyChange(event: any) {
    this.selectedCurrency = event.value;
  }

  getContactFormData() {
    this.apiService
      .getAPI({
        url: `/Contact/${this.JobInformation.contactId}`,
        model: ContactFormModel,
      })
      .subscribe({
        next: (res) => {
          console.log('get', res);
          let contact = res.data;
          this.formStep1.patchValue({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            companyName: this.JobInformation?.jobTitle,
          });
        },
        error: (error) => {},
      });
  }

  sendContactForm() {
    let PhoneNumber: any = this.formStep1.value.contact?.phone;

    let body: any = {
      firstName: this.formStep1.value.firstName,
      lastName: this.formStep1.value.lastName,
      location: this.JobInformation?.geoData?.description,
      locationPlaceId: this.JobInformation.countryId,
      subject: this.JobInformation?.jobTitle,
      email: this.formStep1.value.email,
      phoneCode: PhoneNumber.dialCode,
      phoneNumber: PhoneNumber.number,
      message: this.formStep1.value.message,
      domainName: this.JobInformation?.jobTitle,
    };
    this.apiService.sendContactForm(body).subscribe((res) => {
      console.log('form submitted');
      this.next();
    });
  }
}
