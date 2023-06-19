import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  currentCandiate = 1;

  showMoreAboutTextLength = 778;
  showMoreText = true;
  moreTextCount: number = 778;

  stateOfTruncatedText!: boolean[];

  aboutText: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe inventore enim delectus quo cum mollitia,
   quas doloribus eos iusto exercitationem sed dolorum deleniti totam maxime quia aliquid incidunt vero! Sit, tempore magni earum 
   nesciunt ducimus esse id beatae, omnis soluta provident reprehenderit nisi. Excepturi earum repudiandae ab distinctio odio 
  possimus consequatur, ducimus delectus impedit necessitatibus quis placeat suscipit doloribus eaque rerum facere nisi unde a dicta 
  voluptatem repellendus. Libero expedita, officia accusantium dolore at distinctio cupiditate unde, quaerat quo, quos cumque vitae 
  veritatis autem dolor sint! Maiores esse doloribus consectetur 

  quae nulla illum eaque porro. Magnam voluptate vel quis molestias corporis quasi itaque amet commodi velit libero repellat optio 
  numquam eveniet eius possimus veniam, veritatis voluptatibus consequatur mollitia! Voluptates cumque, consequuntur ut minus temporibus
  maxime perferendis rem enim esse est eum sit explicabo officia nisi fugit officiis omnis inventore saepe consectetur, praesentium quam?
  Iste, est omnis. Ab, aspernatur illo! Distinctio cupiditate, asperiores rerum quas a quia! Dolore magni doloremque accusantium ratione,
  rem quae quam. Voluptatibus expedita placeat neque mollitia eius fugiat architecto delectus beatae, accusamus, porro nisi consequatur 
  consequuntur animi eveniet soluta nihil facilis exercitationem quibusdam nulla similique ab provident. Deleniti doloribus non dolor
  accusamus quasi saepe reprehenderit, fugiat debitis? `;

  experiences: any = [];
  noOfExperiences = 5;
  isExperienceToggle: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CandidateFullResumeComponent>,
    public trimPipe: TrimTextPipe,
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef
  ) {
    this.experiences = {
      totalExperiece: '6 yrs 11 mos',
      meta: [
        {
          id: 1,
          icon: 'icon',
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: null,
          title: 'Senior Back-end Developer',
          experience: '1 yr 5 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2023',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: 'icon',
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: null,
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: 'icon',
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: null,
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: 'icon',
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: null,
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: 'icon',
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
        {
          id: 1,
          icon: null,
          title: 'Senior NodeJS Developer',
          experience: '1 yr 3 mos',
          company: 'FutureDev Agency',
          from: 'Jan 2022',
          to: 'Present',
          address: 'Port Melbourne, Victoria',
        },
      ],
    };
  }

  ngOnInit() {}

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
      this.moreTextCount = this.aboutText.length;
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
