
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsCardComponent } from './contact-us-card/contact-us-card.component';
import { SalaryGraphComponent } from './salary-graph/salary-graph.component';
import { SliderComponent } from './slider/slider.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { CandidateCardComponent } from './candidate-card/candidate-card.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { CandidateFullResumeComponent } from './candidate-full-resume/candidate-full-resume.component';
import { ExpensionPanelComponent } from '@app/@shared/components/expension-panel/expension-panel.component';
import { ButtonCloseComponent } from '@app/@shared/components/button-close/button-close.component';
import { TrimTextPipe } from '@app/@shared/pipes/trim-text.pipe';
import { HowIWorkComponent } from '@app/components/how-i-work/how-i-work.component';
import { ContactMeComponent } from '@app/components/contact-me/contact-me.component';


const routes: Routes = [
  { path: '', component: EmployerComponent },
];

@NgModule({
  declarations: [
    EmployerComponent,
    ContactUsCardComponent,
    CandidateCardComponent,
    SalaryGraphComponent,
    SliderComponent,
    CandidateFullResumeComponent
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
    ContactMeComponent,
    TrimTextPipe,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ]
})
export class EmployerModule { }
