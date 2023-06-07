import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Error404Component } from '@app/@shared/error404/error404.component';
import { CandidateFullResumeComponent } from '../candidate-full-resume/candidate-full-resume.component';

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
}
