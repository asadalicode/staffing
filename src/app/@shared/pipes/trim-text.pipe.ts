import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true
})
export class TrimTextPipe implements PipeTransform {

  private showFullText: { [key: string]: boolean } = {};

  transform(value: string, length: number, textKey: string): string {
    if (this.showFullText[textKey]) {
      return value;
    }
    if (value.length <= length) {
      return value;
    }
    return value.substr(0, length) + '...';
  }

  toggleText(textKey: string): void {
    this.showFullText[textKey] = !this.showFullText[textKey];
  }

}
