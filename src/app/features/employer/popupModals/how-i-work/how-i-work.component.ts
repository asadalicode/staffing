import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-how-i-work',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonCloseComponent, TranslateModule],
  templateUrl: './how-i-work.component.html',
  styleUrls: ['./how-i-work.component.scss']
})
export class HowIWorkComponent {

  constructor(
    public dialogRef: MatDialogRef<HowIWorkComponent>) { }
  
  
  close() {
    this.dialogRef.close(false);
  }

  submit() {
    this.dialogRef.close(true);
  }
}