import { Component } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent {
  total = 32;
  items = [1,1,1,1]
  constructor() { }
  

  loadmore() {
    this.items.push(1);
    this.items.push(1);
    this.items.push(1);
    this.items.push(1);
  }

  gotoTop() {
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
}
