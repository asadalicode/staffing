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
  sliceCandidatesList = true;
  jobInformation!: any;
  candidateFullName = '';
  startPage : number;
  paginationLimit:number; 
  itemsPerPage = 4;
  constructor(
    public dialog: MatDialog,
    private employerService: EmployerService,
    private apiService: ApiService
  ) {
    this.startPage = 0;
    this.paginationLimit = 6;
  }

  ngOnInit() {
    console.log(this.item);
    this.perPageLimit()
  }

  perPageLimit() {
    if (this.item?.skills.length <= 4) {
      this.itemsPerPage = this.item?.skills.length;
    } else {
      this.itemsPerPage = 6;
    }
  }

  showMoreItems()
  {
     this.paginationLimit = Number(this.paginationLimit) + 6;        
  }
  showLessItems()
  {
    this.paginationLimit = 6;
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
    this.apiService.setAllFavouritesFlag.next(false);
    const dialogRef = this.dialog.open(BookAnInterviewComponent, {
      panelClass: ['popup-modal', 'lg'], data:this.item
    });
  }

  onInviteToJob() {
    this.apiService.setAllFavouritesFlag.next(false);
    const dialogRef = this.dialog.open(InviteToJobComponent, {
      panelClass: ['popup-modal', 'lg'], data:this.item
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

  toggleFavorite() {
    this.item['fav'] = !this.item['fav'];
    if (this.item['fav']) {
      this.employerService.getFavoriteCandidates().subscribe((res)=> {
        if(res && res.length<5) {
          this.employerService.addItemToList(this.item);
        }
    })
    } else {
      this.employerService.removeItemFromList(this.item)
    }
   
  }
}
