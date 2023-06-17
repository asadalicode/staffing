import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTruncateUlItems]',
  standalone: true
})
export class TruncateUlItemsDirective {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const element: HTMLElement = this.elementRef.nativeElement;
    const listItems: HTMLElement[] = Array.from(element.querySelectorAll('li'));

    let charCount = 0;
    let lastVisibleItem: HTMLElement | null = null;

    for (const item of listItems) {
      charCount += item.textContent?.length || 0;

      if (charCount > 400) {
        item.style.display = 'none';
        break;
      }

      lastVisibleItem = item;
    }

    if (lastVisibleItem) {
      const lastVisibleText = lastVisibleItem.textContent || '';
      const truncatedText = lastVisibleText.slice(0, 400 - charCount) + '...';
      lastVisibleItem.innerHTML = `<span>${truncatedText}</span>`;
    }
  }
}

