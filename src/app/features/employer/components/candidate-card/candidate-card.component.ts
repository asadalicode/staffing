import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateFullResumeComponent } from '../../popupModals/candidate-full-resume/candidate-full-resume.component';
import { BookAnInterviewComponent } from '../../popupModals/book-an-interview/book-an-interview.component';
import { InviteToJobComponent } from '../../popupModals/invite-to-job/invite-to-job.component';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
  
export class CandidateCardComponent {
  @Input() item: any;

  constructor(public dialog: MatDialog) { }

  openFullResume(): void {
    const dialogRef = this.dialog.open(CandidateFullResumeComponent, {
      panelClass: 'full-resume-modal',
    });
  }

  onBookInterview(): void {
    const dialogRef = this.dialog.open(BookAnInterviewComponent, {
      panelClass: ['popup-modal', 'lg'],
    });
  }

  onInviteToJob() {
    const dialogRef = this.dialog.open(InviteToJobComponent, {
      panelClass: ['popup-modal', 'lg'],
    });
  }
}
