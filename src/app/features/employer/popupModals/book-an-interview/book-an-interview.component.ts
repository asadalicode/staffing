import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { ReusableTextAreaComponent } from '@app/@shared/Forms/reusable-textArea/reusable-textArea.component';
import { ApiService } from '@app/@shared/service/api.service';
import { EmployerService } from '../../employer.service';
import { ContactFormModel } from '@app/@shared/dataModels';
import { ActivatedRoute, Router } from '@angular/router';

declare const Feathery:any;
@Component({
  selector: 'app-book-an-interview',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    FormsModule,
    ReactiveFormsModule,
    ReusableInputComponent,
    ReusableTextAreaComponent,
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
  JobInformation!: any;
  interviewTypeList = [
    { label: 'One on one', value: '1', data: { label: 'One on one' } },
    { label: 'Video', value: '2', data: { label: 'Video' } },
    { label: 'Phone', value: '3', data: { label: 'Phone' } },
    { label: 'Informal', value: '4', data: { label: 'Informal' } },
    { label: 'Group', value: '5', data: { label: 'Group' } },
  ];
  tasInformation: any;
  jobId: any;

  constructor(
    public dialogRef: MatDialogRef<BookAnInterviewComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public employerService: EmployerService,
    private renderer: Renderer2,
    private readonly elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public candidateData: any
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
      interviewType: new FormControl('', Validators.required),
    });
    this.getTasInformation();
  }

  ngOnInit(): void {
    this.employerService.getJobInformation().subscribe((res) => {
      this.JobInformation = res;
      this.getContactFormData();
    });
    this.getParam()
    console.log(this.candidateData)
  }

  getParam() {
    this.route.queryParams.subscribe((res:any)=> {
      this.jobId= res.id;
    })
  }

  getTasInformation() {
    this.employerService.getTasInformation().subscribe((res: any) => {
      this.tasInformation = res;
    });
  }

  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@feathery/react@latest/umd/index.js';
   script.onload = () => {
    this.initializeFeathery();
   };
   this.renderer.appendChild(this.elementRef.nativeElement, script);
    }
  
  
    initializeFeathery() {
      if (typeof Feathery !== 'undefined') {
        Feathery.init('b993e430-8d5a-4893-8b66-c3e377f27a53');
        Feathery.renderAt('container', { formName: '9 Web TT Invite to Job' });
        Feathery.setFieldValues({ '9-in-user-first-name': this.candidateData?.firstName });  
        Feathery.setFieldValues({ '9-in-user-last-name': this.candidateData?.lastName });  
        Feathery.setFieldValues({ '9-in-opp-role-title-tt': this.JobInformation?.jobTitle });  
        Feathery.setFieldValues({ '9-in-opp-id-no-tt': this.JobInformation?.jobId });  
        Feathery.setFieldValues({ '9-in-opp-location-role-from-tt': this.JobInformation?.role?.roleId });  
        Feathery.setFieldValues({ '9-in-opp-country-role-from-tt': this.JobInformation?.countryId });  
        Feathery.setFieldValues({ '9-in-opp-advertiser-id-no-tt': this.JobInformation?.contactId });  
        Feathery.setFieldValues({ '9-in-opp-advertiser-user-id-no-tt': this.JobInformation?.jobId }); 
        Feathery.setFieldValues({ '9-in-candidate-count': 1 });  // if not open from favourites list
      } else {
        console.error('Feathery script is not loaded properly.');
      }
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
          this.loadScript();
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
      this.step = 2;
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.formStep1.valid) {
      console.log(this.formStep1.value);
      this.sendContactForm();
    } else {
      this.formStep1.markAllAsTouched();
      console.log(this.formStep1.value);

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
