import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { ReusableInputComponent } from '@app/@shared/Forms/reusable-input/reusable-input.component';
import { ReusableFormComponent } from '@app/@shared/Forms/reusable-form/reusable-form.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCloseComponent,
    ReusableInputComponent,
    ReusableFormComponent,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {


  formGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ContactMeComponent>) { }


  close() {
    this.dialogRef.close();
  }
}
