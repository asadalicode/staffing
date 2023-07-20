
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private EDMId!: string;
  private TopTalentList = [];
  private TasInformation: any;
  JobInformation: any;

  constructor(private route: ActivatedRoute, private _router: Router) {
    this.navigateToEDMRoute();
    this.setEDMId();
  }


  navigateToEDMRoute() {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this._router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: 'd184d1d1-14a6-415d-b6cc-71eb5d2de1b3'
        // EDMId: '7A5658AC-4CA5-4049-A0C2-8468089BEE09'
      },
      queryParamsHandling: 'merge',
    //  skipLocationChange: true
    });
  }

 private setEDMId() {
    this.route.queryParams
      .subscribe((params:any) => {
        this.EDMId = params.id;
      }
      );
  }

  getEDMID() {
    return this.EDMId;
  }


  setTopTalentList(list: any) {
    console.log(list)
    this.TopTalentList = list;
  }

  getTotalTalentList() {
    return this.TopTalentList.length;
  }

  // current index of cadidates List
  getCurrentIndex(talentProfileId: any) {
    let index = this.TopTalentList.findIndex((item: any) => item.talent == talentProfileId);
    return index;
  }

  getNextCandidate(talentProfileId: any): Observable<any> {
    let index = this.getCurrentIndex(talentProfileId);
      return of(this.TopTalentList[index + 1]);
  }

  getPrevCandidate(talentProfileId: any): Observable<any> {
    let index = this.getCurrentIndex(talentProfileId);
    return  of(this.TopTalentList[index - 1]);
  }


  // set and tax information from main employee component and get from anywhere
  setTasInformation(information: any) {
    this.TasInformation = information;
  }

  getTasInformation(): Observable<any> {
    return of(this.TasInformation);
  }

  // set job information from main employee component and get from anywhere
  setJobInformation(information: any) {
    this.JobInformation = information;
  }

  getJobInformation(): Observable<any> {
    return of(this.JobInformation);
  }
}
0