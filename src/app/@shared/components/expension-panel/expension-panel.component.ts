import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expension-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expension-panel.component.html',
  styleUrls: ['./expension-panel.component.scss']
})
export class ExpensionPanelComponent {
  @Input() title!: string;
  expanded: boolean = true;

  toggleContent(): void {
    this.expanded = !this.expanded;
  }
}
