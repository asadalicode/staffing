import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  Select2Data,
  Select2Module,
  Select2Option,
} from 'ng-select2-component';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReusableInputComponent } from '../reusable-input/reusable-input.component';

interface DataType {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SelectInputComponent {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() data!: Select2Data;
  @Input() control = new FormControl('');
  @Input() customValidator: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  dataSet!: Select2Data;
  update($event: any) {
    console.log($event);
    this.onSelect.emit($event);
  }

  onChange: ((value: any) => void) | undefined;
  onTouched!: () => void;

  writeValue(value: any) {
    this.control.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  constructor() {}

  ngOnInit() {
    console.log(this.data);

    // this.control.setValidators(this.customValidator);
    console.log(this.control);
  }
}
