import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HowIWorkComponent } from '../../popupModals/how-i-work/how-i-work.component';
import { ContactMeComponent } from '../../popupModals/contact-me/contact-me.component';

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
      data: {
        title: 'Contact Me'
      },
      panelClass: ['popup-modal', 'lg'],
    });
  }
  findNextHire() {
    const dialogRef = this.dialog.open(ContactMeComponent, {
      data: {
        title: 'Find My Next Hire'
      },
      panelClass: ['popup-modal', 'lg'],
    });
  }
}
