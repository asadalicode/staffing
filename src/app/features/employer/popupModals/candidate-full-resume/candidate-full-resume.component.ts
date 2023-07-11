import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrimTextPipe } from '@app/@shared/pipes/trim-text.pipe';
import { BookAnInterviewComponent } from '../book-an-interview/book-an-interview.component';
import { InviteToJobComponent } from '../invite-to-job/invite-to-job.component';
import { ApiService } from '@app/@shared/service/api.service';
import { TalentSummaryModel } from '@app/@shared/dataModels';
@Component({
  selector: 'app-candidate-full-resume',
  templateUrl: './candidate-full-resume.component.html',
  styleUrls: ['./candidate-full-resume.component.scss'],
  providers: [TrimTextPipe], // Declare TrimPipe as a provider
})
export class CandidateFullResumeComponent implements OnInit {
  totalCandidates = 32;
  currentCandiate = 1;
  talentSummary!: any;

  showMoreAboutTextLength = 778;
  showMoreText = true;
  moreTextCount: number = 778;

  stateOfTruncatedText!: boolean[];


  experiences: any = [];
  noOfExperiences = 5;
  isExperienceToggle: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CandidateFullResumeComponent>,
    public trimPipe: TrimTextPipe,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.experiences = {
      totalExperiece: '6 yrs 11 mos',
    };
  }

  ngOnInit() {
    // this.getTalentSummary(this.data?.talentProfileId);
    this.talentSummary = this.data.candidate;
  }

  prevCandidate() {
    if (this.currentCandiate > 1) {
      this.currentCandiate -= 1;
    }
  }

  nextCandidate() {
    if (this.totalCandidates > this.currentCandiate) {
      this.currentCandiate += 1;
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

  toggleLongTextState(index: number) {
    this.stateOfTruncatedText[index] = !this.stateOfTruncatedText[index];
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

  toggleMoreExperience() {
    this.isExperienceToggle = !this.isExperienceToggle;
    if (this.isExperienceToggle) {
      this.noOfExperiences = this.experiences.meta.length;
    } else {
      this.noOfExperiences = 5;
    }
  }
}
