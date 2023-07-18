import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateUlItems',
  standalone: true
})
export class TruncateUlItemsPipe implements PipeTransform {
  transform(items: string[], limit: number): string[] {
    
    let combinedText = items.join(' ');
    if (combinedText.length <= limit) {
      return items;
    } else {
      const truncatedText = combinedText.substring(0, limit);
      const lastIndexOfSpace = truncatedText.lastIndexOf(' ');
      const truncatedItems = truncatedText.substring(0, lastIndexOfSpace).split(' ');
      return truncatedItems.concat('...');
    }
  }

}
