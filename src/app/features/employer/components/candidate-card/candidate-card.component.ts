import { EmployerService } from './../../employer.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateCardComponent implements OnInit {
  @Input() item!: any;
  sliceRolesList = true;
  jobInformation!: any;
  candidateFullName = '';

  constructor(
    public dialog: MatDialog,
    private employerService: EmployerService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    console.log(this.item);
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.item && this.item.allRoles.length > 0) {
      this.item['totaldays'] = this.item.allRoles.reduce(
        (partialSum: any, a: any) => partialSum + a.days,
        0
      );
    }

    this.matchSkills(this.item);
    this.candidateFullName = this.getCandidateFullName(this.item);
    this.employerService.getJobInformation().subscribe((res) => {
      this.jobInformation = res;
    });
  }

  openFullResume(): void {
    const dialogRef = this.dialog.open(CandidateFullResumeComponent, {
      data: {
        talentProfileId: this.item.talentProfileId,
        candidate: this.item,
      },
      panelClass: 'full-resume-modal',
    });
  }

  getCandidateFullName(item: any) {
    return `${this.item.firstName} ${this.item.lastName}`;
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
    this.item?.skills?.forEach((e: any, index: any) => {
      if (this.item.jobSkills !== null) {
        let matchedElement: any = this.item.jobSkills.filter(
          (skill: any) => skill.skillName === e.skillName
        );
        if (matchedElement.length) {
          this.item.skills[index].matchedSkill = true;
        }
      }
    });
  }
}
