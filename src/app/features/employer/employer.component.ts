import { Component, OnInit } from '@angular/core';
import {
  TopTalentEdmModel,
  JobInfoModel,
  TalentSummaryModel,
  TasInformationModel,
} from '@app/@shared/dataModels';
import { ApiService } from '@app/@shared/service/api.service';
import { EmployerService } from './employer.service';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent implements OnInit {
  itemsPerPage = 4;
  windowScrolled = false;
  jobInformation!: any;
  tabSelected = 'All Candidates'; // default
  topTalentList!: TopTalentEdmModel[];
  topTalentCandidates: any = [];
  taxInformation: any;
  constructor(
    private apiService: ApiService,
    private employerService: EmployerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
    this.getTopTalentEdmList();
    this.getJobInformation();
  }

  loadmore() {
    if (this.topTalentCandidates.length > this.itemsPerPage) {
      this.itemsPerPage += 4;
    } else {
      this.itemsPerPage = this.topTalentCandidates.length;
    }
  }

  filter(event: any) { }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTopTalentEdmList() {
    this.spinner.show();
    this.apiService
      .getAPI({
        url: `/api/v1/JobSearch/TopTalentEDM?id=${this.employerService.getEDMID()}&daysValid=${100}`,
        model: TopTalentEdmModel,
      })
      .subscribe({
        next: (res) => {
          console.log('getTopTalentEdmList:', res);
          this.topTalentList = res;
          this.getTasInformation();
          this.getGroupedCandidates();
        },
        error: (error) => {
          this.spinner.hide();
        },
      });
  }

  getJobInformation() {
    this.apiService
      .getAPI({
        url: `/Edm/${this.employerService.getEDMID()}/job`,
        model: JobInfoModel,
      })
      .subscribe(
        (res) => {
          console.log('getJobInformation', res);
          this.jobInformation = res;
        },
        (error) => { }
      );
  }

  getGroupedCandidates() {
    forkJoin(
      this.topTalentList.map((categ: any) =>
        this.apiService.getAPI({
          url: `/api/candidates/${categ.talentProfileId
            }/summary/${this.employerService.getEDMID()}`,
          model: TalentSummaryModel,
        })
      )
    ).subscribe({
      next: (p: any) => {
        let result: any = [];
        p.forEach((element: any, index: any) => {
          result.push(element.data);
        });
        this.topTalentCandidates = _(result)
          .groupBy((talent: any) => talent.talentProfileId)
          .map((candidate: any, talent: any) => ({ candidate, talent }))
          .value();
        this.spinner.hide();
        console.log(this.topTalentCandidates);
        this.employerService.setTopTalentList(this.topTalentCandidates);
      },
      error: (error) => {
        this.spinner.hide();
      },
    });
  }

  getTasInformation() {
    // /Edm/d7d89070 - dada - 4f47 - ab39 - 2b9f187ed45b / tas

    this.apiService
      .getAPI({
        url: `/Edm/${this.employerService.getEDMID()}/tas`,
        model: TasInformationModel,
      })
      .subscribe((res) => {
        console.log('get Tax information:', res);
        this.taxInformation = res;
      });
  }

  trackByfn(index: any, item: any) {
    return item.uniqueValue;
  }
}
