import { Component, ElementRef, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  items = [
    { title: '1'},
    { title: '1'},
    { title: '1'},
    { title: '1'},
    { title: '1'},
    { title: '1'},
]
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    center: true,
    margin:48,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1024: {
        items: 3
      },
      1500: {
        items:3
      }
    },
    nav: true
  }
}
