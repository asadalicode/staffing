import { EmployerService } from './../../employer.service';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrimTextPipe } from '@app/@shared/pipes/trim-text.pipe';
import { BookAnInterviewComponent } from '../book-an-interview/book-an-interview.component';
import { InviteToJobComponent } from '../invite-to-job/invite-to-job.component';
@Component({
  selector: 'app-candidate-full-resume',
  templateUrl: './candidate-full-resume.component.html',
  styleUrls: ['./candidate-full-resume.component.scss'],
  providers: [TrimTextPipe], // Declare TrimPipe as a provider
})
export class CandidateFullResumeComponent implements OnInit {
  totalCandidates = 32;
  isView = false;
  currentCandiate = 1;
  talentSummary!: any;
  talentId: any;

  showMoreAboutTextLength = 778;
  showMoreText = true;
  moreTextCount: number = 778;

  stateOfTruncatedText!: boolean[];

  sliceRolesList = true;
  currentCandidateIndex = 0;
  candidateFullName: any;
  jobInformation!: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CandidateFullResumeComponent>,
    public trimPipe: TrimTextPipe,
    private employerService: EmployerService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.talentSummary = this.data.candidate;
    this.calculateExperianceDays();
    this.totalCandidates = this.employerService.getTotalTalentList();
    this.talentId = this.data.talentProfileId;
    this.getCurrentIndex(this.talentId);
    this.candidateFullName = this.getCandidateFullName(this.talentSummary);
    this.employerService.getJobInformation().subscribe(res => {
      this.jobInformation = res;
    });
  }

  getCandidateFullName(item:any) {
    return `${item.firstName} ${item.lastName}`
  }
  getCurrentIndex(id:any) {
    this.currentCandidateIndex = this.employerService.getCurrentIndex(id);
  }

  nextCandidate() {
    if (this.totalCandidates > this.currentCandidateIndex) {
      this.employerService.getNextCandidate(this.talentId).subscribe(res => {
        this.ngZone.run(() => { 
          this.talentSummary = { ...res.candidate[0] };
          this.talentId = res.talent;
          this.getCurrentIndex(this.talentId);
          this.candidateFullName = this.getCandidateFullName(this.talentSummary);
          this.calculateExperianceDays();
        });
      })
    }
  }
  prevCandidate() {
    if (this.currentCandidateIndex > 0) {  
      this.employerService.getPrevCandidate(this.talentId).subscribe(res => {
        this.ngZone.run(() => {
          this.talentSummary = { ...res.candidate[0] };
          this.talentId = res.talent;
          this.getCurrentIndex(this.talentId);
          this.candidateFullName = this.getCandidateFullName(this.talentSummary);
          this.calculateExperianceDays();
        });
      })
     
    }
  }

  calculateExperianceDays() {
    if (this.talentSummary && this.talentSummary.allRoles.length > 0) {
      this.talentSummary['totaldays'] = this.talentSummary.allRoles.reduce((partialSum: any, a: any) => partialSum + a.days, 0)
    }
  }
  close() {
    this.dialogRef.close();
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

  toggleShowMoretext() {
    this.showMoreText = !this.showMoreText;
    if (!this.showMoreText) {
      this.moreTextCount = this.talentSummary?.careerSummary.length;
    } else {
      this.moreTextCount = 778;
    }
    this.cdr.detectChanges();
  }

  getRecentRole(roleId:number) {
    return this.talentSummary?.allRoles.find((data:any)=> data.roleId==roleId)
  }

}
