import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
  
export class CandidateCardComponent {
  @Input() item: any;
}
