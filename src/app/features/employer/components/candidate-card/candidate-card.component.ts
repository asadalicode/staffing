import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateFullResumeComponent } from '../../popupModals/candidate-full-resume/candidate-full-resume.component';
import { BookAnInterviewComponent } from '../../popupModals/book-an-interview/book-an-interview.component';
import { InviteToJobComponent } from '../../popupModals/invite-to-job/invite-to-job.component';
import { ApiService } from '@app/@shared/service/api.service';
import { TalentSummaryModel } from '@app/@shared/dataModels';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class CandidateCardComponent implements OnInit {
  @Input() item!: any;


  constructor(public dialog: MatDialog, private apiService: ApiService) { }



  ngOnInit() {
    console.log(this.item)
  }

  openFullResume(): void {
    const dialogRef = this.dialog.open(CandidateFullResumeComponent, {
      data: {
        talentProfileId: this.item.talentProfileId,
        candidate: this.item
      },
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
