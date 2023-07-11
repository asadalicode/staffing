import { Component, OnInit } from '@angular/core';
import {
  TopTalentEdmModel,
  JobInfoModel,
  TalentSummaryModel,
} from '@app/@shared/dataModels';
import { ApiService } from '@app/@shared/service/api.service';
import { EmployerService } from './employer.service';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent implements OnInit {
  total = 32;
  itemsPerPage = 4;
  items = [{ fav: true }, { fav: false }, { fav: false }, { fav: true }];
  talentList: any = [];
  windowScrolled = false;
  jobInformation!: any;
  tabSelected = 'All Candidates'; // default
  topTalentList!: TopTalentEdmModel[];
  topTalentCandidates: any = [];
  constructor(private apiService: ApiService, private employerService: EmployerService) {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
    this.getTopTalentEdmList();
    this.getJobInformation();
  }

  loadmore() {
    this.itemsPerPage += 4;
  }

  filter(event: any) {}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTopTalentEdmList() {
    this.apiService
      .getAPI({
        url: `/api/v1/JobSearch/TopTalentEDM?id=${this.employerService.getEDMID()}&daysValid=${100}`,
        model: TopTalentEdmModel,
      })
      .subscribe((res) => {
        console.log('getTopTalentEdmList:', res);
        this.topTalentList = res;
        this.getGroupedCandidates();
      });
  }


  getJobInformation() {
    this.apiService
      .getAPI({
        url: `/Edm/${this.employerService.getEDMID()}/job`,
        model: JobInfoModel,
      })
      .subscribe((res) => {
        console.log('getJobInformation', res);
        this.jobInformation = res;
      });
  }

  getGroupedCandidates() {
    forkJoin(
      this.topTalentList.map((categ: any) =>
        this.apiService.getAPI({
          url: `/api/candidates/${categ.talentProfileId}/summary/${'01GYV97RGHB05DQ36SRKFVZ9CZ'}`,
          model: TalentSummaryModel,
        })
      )
    ).subscribe((p: any) => {
      let result: any = [];
      p.forEach((element: any, index: any) => {
        result.push(element.data);
      });
      this.topTalentCandidates = _(result)
        .groupBy((talent:any) => talent.talentProfileId)
        .map((candidate:any, talent:any) => ({ candidate, talent }))
        .value();
      console.log(this.topTalentCandidates);
    });
  }

  trackByfn(index:any, item:any) {
    return item.uniqueValue;
  }
}
