import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true
})
export class TrimTextPipe implements PipeTransform {

  private showFullText = false;

  transform(value: string, length: number, showMore: boolean): string {
    if (!showMore) {
      return value;
    }
    if (value.length <= length) {
      return value;
    }
    return value.substr(0, length) + '...';
  }

  // toggleText(textKey: string): void {
  //   this.showFullText = !this.showFullText;
  // }

}
