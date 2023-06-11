import { Component, Pipe, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCloseComponent } from '../button-close/button-close.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfigDate } from '@app/@shared/Model/ConfirmationConfigData';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [CommonModule, ButtonCloseComponent, MatDialogModule],
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

  // iconSrc!: string;
  // title!: string;
  // titleColor!: string;

  config!: ConfigDate;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigDate) { 
    
    this.config = data;
    }


  close() {
    this.dialogRef.close();
  }

  goAhead() {
    this.dialogRef.close(true);
  }
  navigate(link:any) {
    
  }
}
