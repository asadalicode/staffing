import { ConfirmationPopupComponent } from './../../@shared/components/confirmation-popup/confirmation-popup.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    ReusableInputComponent,
    ConfirmationPopupComponent,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {

  jobTitle: string = 'NodeJS Developer';
  formGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ContactMeComponent>,
    public dialog: MatDialog) { }


  close() {
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close('yes');
    this.openConfirmationPopup();
  }


  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        iconSrc:'assets/icons/check.svg',
        title: `Thanks ${this.formGroup.value.firstName}!`,
        titleClass: 'text-secondary-light',
        description: `Can you tell me a little more about the ${this.jobTitle} role`,
        descriptionClass: '!font-bold text-secondary-light !text-[24px]',
        buttonText: 'Process',
        buttonClass: 'btn-primary-lg',
        buttonLink: '',
        buttonLinkText: 'Back to Homepage',
        buttonLinkColor: 'btn-link-sm text-primary-dark !text-decoration-none'
      },
      panelClass: ['popup-modal', 'md'],
    });

    dialogRef.afterClosed().subscribe(yes => {
      // if (yes) {
      //   this.contactMe();
      // }
    });
  }
}
