import { EmployerService } from './../../employer.service';
import { UserCardComponent } from './../../components/user-card/user-card.component';

import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactMeAdditionalDetailsComponent } from '../contact-me-additional-details/contact-me-additional-details.component';
import { ConfirmationPopupComponent } from '@app/@shared/components/confirmation-popup/confirmation-popup.component';
import { PhoneNumberInputComponent } from '@app/@shared/Forms/phone-number-input/phone-number-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '@app/@shared/service/api.service';
import { ContactFormModel } from '@app/@shared/dataModels';
import { ReusableTextAreaComponent } from '@app/@shared/Forms/reusable-textArea/reusable-textArea.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

declare const Feathery:any;

interface Config {
  title: string;
}

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    ReusableInputComponent,
    ReusableTextAreaComponent,
    ConfirmationPopupComponent,
    FormsModule,
    UserCardComponent,
    PhoneNumberInputComponent,
    TranslateModule,
    ContactMeAdditionalDetailsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
})


export class ContactMeComponent implements OnInit {
  jobTitle: string = 'NodeJS Developer';
  JobInformation!: any;
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    companyName: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    contact: new FormGroup({
      phone: new FormControl({}, Validators.required),
    }),
  });
  tasInformation: any;
  jobId:any;
  constructor(
    private readonly elementRef: ElementRef,
          private renderer: Renderer2,
          private route: ActivatedRoute,
          private router: Router,
    private apiService: ApiService,
    public employerService: EmployerService,
    public dialogRef: MatDialogRef<ContactMeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Config,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    
    
  }

  ngOnInit() {
    this.employerService.getJobInformation().subscribe((res) => {
      this.JobInformation = res;
      console.log(this.JobInformation)
      this.getContactFormData();
      this.getTasInformation()
    });
    this.getParam()
  
  }

  getTasInformation() {
    this.employerService.getTasInformation().subscribe((res: any) => {
      this.tasInformation = res;
    });
  }

  close() {
    this.dialogRef.close();
  }

  loadScript() {
  // this.spinner.show();
  const script = this.renderer.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@feathery/react@latest/umd/index.js';
 script.onload = () => {
  this.initializeFeathery();
 };
 this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  getParam() {
    this.route.queryParams.subscribe((res:any)=> {
      this.jobId= res.id;
    })
  }


  initializeFeathery() {
    if (typeof Feathery !== 'undefined') {
      Feathery.init('b993e430-8d5a-4893-8b66-c3e377f27a53');
      Feathery.renderAt('container', { formName: '8 Web TT Contact Us' });
      Feathery.setFieldValues({ '8-in-user-first-name': this.tasInformation.name });  
      Feathery.setFieldValues({ '8-in-user-job-title': this.tasInformation.jobTitle });  
      // Feathery.setFieldValues({ '8-user-last-name': this.tasInformation.lastName });  
      Feathery.setFieldValues({ '8-in-user-contact-phone': this.tasInformation?.phone });  
      Feathery.setFieldValues({ '8-in-user-id': this.jobId });  
      Feathery.setFieldValues({ '8-in-opp-tt-role-title': this.JobInformation?.jobTitle });  
      Feathery.setFieldValues({ '8-in-opp-tt-id-no': this.JobInformation?.jobId });  
      Feathery.setFieldValues({ '8-in-opp-tt-location-role-from': this.JobInformation?.role?.roleId });  
      Feathery.setFieldValues({ '8-in-opp-tt-country-role-from': this.JobInformation?.countryId });  
      Feathery.setFieldValues({ '8-in-opp-tt-advertiser-id-no': this.JobInformation?.contactId });  
      Feathery.setFieldValues({ '8-in-opp-tt-advertiser-user-id-no': this.JobInformation?.jobId });  
      Feathery.setFieldValues({ '8-in-src-url': window.location.href});  
      Feathery.setFieldValues({ '8-in-src-domain': window.origin+this.router.url.split('?')[0] });  
      // this.spinner.hide();
    } else {
      console.error('Feathery script is not loaded properly.');
      // this.spinner.hide();
    }
  }

  submit() {
    console.log(this.contactForm.value);
    this.dialogRef.close('yes');
    this.openConfirmationPopup();
    this.sendContactForm();
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        iconSrc: 'assets/icons/check.svg',
        title: `Thanks ${this.contactForm.value.firstName}!`,
        titleClass: 'text-secondary-light !font-normal !leading-none',
        description: `Can you tell me a little more about the ${this.jobTitle} role`,
        descriptionClass:
          '!font-normal !leading-tight text-secondary-light !text-[24px]',
        buttonText: 'Proceed',
        buttonClass: 'btn-primary-lg',
        buttonLink: '',
        buttonLinkText: 'Back to Homepage',
        buttonLinkColor: 'btn-link-sm text-primary-dark !text-decoration-none',
      },
      panelClass: ['popup-modal', 'md'],
    });

    dialogRef.afterClosed().subscribe((yes) => {
      if (yes) {
        this.goToAdditionalInformation();
      }
    });
  }

  goToAdditionalInformation() {
    const dialogRef = this.dialog.open(ContactMeAdditionalDetailsComponent, {
      data: {},
      panelClass: ['popup-modal', 'lg'],
    });

    dialogRef.afterClosed().subscribe((yes) => {
      if (yes) {
        // this.goToAdditionalInformation();
      }
    });
  }

  getContactFormData() {
    this.apiService
      .getAPI({
        url: `/Contact/${this.JobInformation.contactId}`,
        model: ContactFormModel,
      })
      .subscribe({
        next: (res) => {
          let contact = res.data;
          this.contactForm.patchValue({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            companyName: this.JobInformation?.jobTitle,
          });
          this.loadScript()
            
        },
        error: (error) => {},
      });
  }

  sendContactForm() {
    let PhoneNumber: any = this.contactForm.value.contact?.phone;

    let body: any = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      location: this.JobInformation?.geoData?.description,
      locationPlaceId: this.JobInformation.countryId,
      subject: this.JobInformation?.jobTitle,
      email: this.contactForm.value.email,
      phoneCode: PhoneNumber.dialCode,
      phoneNumber: PhoneNumber.number,
      message: this.contactForm.value.message,
      domainName: this.JobInformation?.jobTitle,
    };
    this.apiService.sendContactForm(body).subscribe((res) => {
      console.log('form submitted');
    });
  }
}
