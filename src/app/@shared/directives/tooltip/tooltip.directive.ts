
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;
  private tooltipElement!: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
    this.addClassToParent();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
    this.removeClassFromParent();
  }

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, text);
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipElement);
  }

  private hideTooltip() {
    this.renderer.removeChild(this.elementRef.nativeElement, this.tooltipElement);
  }

  private addClassToParent() {
    const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.addClass(parentElement, 'relative');
    this.renderer.addClass(this.elementRef.nativeElement, 'cursor-pointer');
  }

  private removeClassFromParent() {
    const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.removeClass(parentElement, 'relative');
    this.renderer.removeClass(this.elementRef.nativeElement, 'cursor-pointer');
  }
}
