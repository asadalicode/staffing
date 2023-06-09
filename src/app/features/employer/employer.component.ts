import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
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
}
