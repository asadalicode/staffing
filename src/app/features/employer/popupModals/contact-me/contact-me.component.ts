import { EmployerService } from './../../employer.service';
import { UserCardComponent } from './../../components/user-card/user-card.component';

import { Component, Inject, OnInit } from '@angular/core';
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

interface Config {
  title: string
}

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    ReusableInputComponent,
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
    contact: new FormGroup({
      phone: new FormControl({}, Validators.required),
    }),
  });

  constructor(
    private apiService: ApiService,
    public employerService: EmployerService,
    public dialogRef: MatDialogRef<ContactMeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Config,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    
    this.employerService.getJobInformation().subscribe(res => {
      this.JobInformation = res;
      this.getContactFormData();
    });
  }

  close() {
    this.dialogRef.close();
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
      .subscribe(
        (res) => {
          console.log('get', res);
          let contact = res.data;
          this.contactForm.patchValue({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email
          });
        },
        (error) => { }
      );
  }

  sendContactForm() {
    
    let PhoneNumber:any = this.contactForm.value.contact?.phone;

    let body:any = {
      "firstName": this.contactForm.value.firstName,
      "lastName": this.contactForm.value.lastName,
      "location": "string",
      "locationPlaceId": this.JobInformation.contactId,
      "subject": "nothing",
      "email": this.contactForm.value.email,
      "phoneCode": PhoneNumber.dialCode,
      "phoneNumber": PhoneNumber.number,
      "message": "dsfsd",
      "domainName": this.contactForm.value.companyName
    }
    this.apiService.sendContactForm(body).subscribe(res => {
      console.log('form submitted');
    });
  }
}
