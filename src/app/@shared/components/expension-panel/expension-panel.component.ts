import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-expension-panel',
  standalone: true,
  imports: [CommonModule, TranslateModule, ObserversModule],
  templateUrl: './expension-panel.component.html',
  styleUrls: ['./expension-panel.component.scss']
})
export class ExpensionPanelComponent {
  @Input() title!: string;
  expanded: boolean = true;
  

  constructor(private cd: ChangeDetectorRef) {}

  toggleContent(): void {
    this.expanded = !this.expanded;
  }
  ngOnChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
    //console.log('ng-content change!');
  }
}
