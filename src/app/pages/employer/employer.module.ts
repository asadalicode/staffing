
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent } from './employer.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsCardComponent } from './contact-us-card/contact-us-card.component';
import { CandidateCardComponent } from './candidate-card/candidate-card.component';
import { SalaryGraphComponent } from './salary-graph/salary-graph.component';
import { SliderComponent } from './slider/slider.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';


const routes: Routes = [
  { path: '', component: EmployerComponent },
];

@NgModule({
  declarations: [
    EmployerComponent,
    ContactUsCardComponent,
    CandidateCardComponent,
    SalaryGraphComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    CarouselModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ]
})
export class EmployerModule { }
