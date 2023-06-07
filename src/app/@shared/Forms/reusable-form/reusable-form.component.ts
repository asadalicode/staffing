import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  
})
export class ReusableFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formClass!: string;

  constructor() { }

  ngOnInit(): void {
  }
  submit() {
    console.log(this.formGroup.value);
  }

}
