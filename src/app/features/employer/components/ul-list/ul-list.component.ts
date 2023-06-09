import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateUlItemsDirective } from '@app/@shared/directives/truncate-ul-items.directive';

@Component({
  selector: 'app-ul-list',
  standalone: true,
  imports: [CommonModule, TruncateUlItemsDirective],
  templateUrl: './ul-list.component.html',
  styleUrls: ['./ul-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UlListComponent {
  truncateDefault = true;
  items: string[] = [
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam distinctio aut eveniet blanditiis cumque quos porro natus tenetur dolores nostrum nemo doloremque ut vitae, dolore fugit. Consequatur quasi at reiciendis.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, animi placeat.',
    'Lorem ipsum dolor sit.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet earum possimus numquam pariatur. Quos illo reprehenderit, ab nostrum soluta ut!',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi mollitia corrupti odit est quo.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi mollitia corrupti odit est quo.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi mollitia corrupti odit est quo.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi mollitia corrupti odit est quo.'
  ];
}
