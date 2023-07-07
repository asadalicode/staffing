import { Component, OnInit } from '@angular/core';
import {
  TopTalentEdmModel,
  JobInfoModel,
  TalentSummaryModel,
} from '@app/@shared/dataModels';
import { ApiService } from '@app/@shared/service/api.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent implements OnInit {
  total = 32;
  items = [{ fav: true }, { fav: false }, { fav: false }, { fav: true }];
  windowScrolled = false;
  tabSelected = 'All Candidates'; // default
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
    this.getTopTalentEdmList();
    this.getJobInformation();
    this.getTalentSummary();
  }

  loadmore() {
    this.items.push({ fav: false });
    this.items.push({ fav: false });
    this.items.push({ fav: true });
    this.items.push({ fav: false });
  }

  filter(event: any) {}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTopTalentEdmList() {
    this.apiService
      .getAPI({
        url: `/api/v1/JobSearch/TopTalentEDM?id=${'7A5658AC-4CA5-4049-A0C2-8468089BEE09'}&daysValid=${100}`,
        model: TopTalentEdmModel,
      })
      .subscribe((res) => {
        console.log('getTopTalentEdmList:', res);
      });
  }

  getJobInformation() {
    this.apiService
      .getAPI({
        url: `/Edm/${'7A5658AC-4CA5-4049-A0C2-8468089BEE09'}/job`,
        model: JobInfoModel,
      })
      .subscribe((res) => {
        console.log('getJobInformation', res);
      });
  }

  // url:/api/candidates/:talentProfileId/summary/:jobId
  // get :talentProfileId from getTopTalentEdmList response and :jobId from getJobInformation
  getTalentSummary() {
    this.apiService
      .getAPI({
        url: `/api/candidates/${204704}/summary/${'01GYV97RGHB05DQ36SRKFVZ9CZ'}`,
        model: TalentSummaryModel,
      })
      .subscribe((res) => {
        console.log('getTalentSummary', res);
      });
  }
}
