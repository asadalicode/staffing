
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private EDMId!: string;
  private TopTalentList = [];

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
        EDMId: '7A5658AC-4CA5-4049-A0C2-8468089BEE09'
      },
      queryParamsHandling: 'merge',
    //  skipLocationChange: true
    });
  }

 private setEDMId() {
    this.route.queryParams
      .subscribe((params:any) => {
        this.EDMId = params.EDMId;
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

  getNextCandidate(talentProfileId: any) {
    let index = this.TopTalentList.findIndex((item: any) => item.talent == talentProfileId);
      return this.TopTalentList[index + 1];
  }

  getPrevCandidate(talentProfileId: any) {
    let index = this.TopTalentList.findIndex((item: any) => item.talent == talentProfileId);
      return this.TopTalentList[index - 1];
    
  }
}
