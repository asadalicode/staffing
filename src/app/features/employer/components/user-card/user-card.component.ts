import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerService } from '../../employer.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  tasInformation!: any;
  constructor(public employerService: EmployerService) { }
  
  ngOnInit() {
    this.getTasInformation();
  }

  getTasInformation() {
    this.employerService.getTasInformation().subscribe((res: any) => {
      this.tasInformation = res;
    });
  }
}
