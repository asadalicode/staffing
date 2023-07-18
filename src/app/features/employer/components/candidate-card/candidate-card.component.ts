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
  sliceRolesList = true;
  candidateFullName = '';


  constructor(public dialog: MatDialog, private apiService: ApiService) { }



  ngOnInit() {
    console.log(this.item);
   
  }

  ngOnChanges(change: SimpleChanges) {
    this.matchSkills(this.item);
    this.candidateFullName = this.getCandidateFullName(this.item);
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

  getCandidateFullName(item:any) {
    return `${this.item.firstName} ${this.item.lastName}`
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

  matchSkills(item: any) {  
    this.item.skills.forEach((e: any, index: any) => {
      if (this.item.jobSkills !== null) {
        let matchedElement: any = this.item.jobSkills.filter((skill: any) => skill.skillName === e.skillName);
        if (matchedElement.length) {
          this.item.skills[index].matchedSkill = true;
        }
      }

    });
  }
}
