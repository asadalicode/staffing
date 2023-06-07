import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactMeComponent } from '@app/components/contact-me/contact-me.component';
import { HowIWorkComponent } from '@app/components/how-i-work/how-i-work.component';

@Component({
  selector: 'app-contact-us-card',
  templateUrl: './contact-us-card.component.html',
  styleUrls: ['./contact-us-card.component.scss']
})
export class ContactUsCardComponent {
  constructor(public dialog: MatDialog) { }

  howToWork(): void {
    const dialogRef = this.dialog.open(HowIWorkComponent, {
      panelClass: ['popup-modal', 'sm'],
    });

    dialogRef.afterClosed().subscribe(yes => {
      if (yes) {
        this.contactMe();
      }  
    });
  }

  contactMe() {
    const dialogRef = this.dialog.open(ContactMeComponent, {
      panelClass: ['popup-modal', 'md'],
    });
  }
}
