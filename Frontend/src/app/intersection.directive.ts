import { Directive, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appIntersection]'
})
export class IntersectionDirective implements AfterViewInit {
  @Output() intersecting: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.intersecting.emit(entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    observer.observe(this.el.nativeElement);
  }
}
