import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpensionPanelComponent } from '@app/@shared/components/expension-panel/expension-panel.component';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { TrimTextPipe } from '@app/@shared/pipes/trim-text.pipe';
import { CandidateFullResumeComponent } from './popupModals/candidate-full-resume/candidate-full-resume.component';
import { HowIWorkComponent } from './popupModals/how-i-work/how-i-work.component';
import { BookAnInterviewComponent } from './popupModals/book-an-interview/book-an-interview.component';
import { ContactMeComponent } from './popupModals/contact-me/contact-me.component';
import { ContactUsCardComponent } from './components/contact-us-card/contact-us-card.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { SalaryGraphComponent } from './components/salary-graph/salary-graph.component';
import { SliderComponent } from './components/slider/slider.component';
import { UlListComponent } from './components/ul-list/ul-list.component';
import { TooltipDirective } from '@app/@shared/directives/tooltip/tooltip.directive';
import { DaysToYearsMonthsDaysPipe, MonthToYearsPipe } from '@app/@shared/pipes/days-to-years-months-days.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [{ path: '', component: EmployerComponent }];

@NgModule({
  declarations: [
    EmployerComponent,
    ContactUsCardComponent,
    CandidateCardComponent,
    SalaryGraphComponent,
    SliderComponent,
    CandidateFullResumeComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    NgChartsModule,
    CarouselModule,
    TranslateModule,
    ExpensionPanelComponent,
    ButtonCloseComponent,
    HowIWorkComponent,
    BookAnInterviewComponent,
    ContactMeComponent,
    TrimTextPipe,
    UlListComponent,
    TooltipDirective,
    DaysToYearsMonthsDaysPipe,
    MonthToYearsPipe,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
  ],
})
export class EmployerModule {}
