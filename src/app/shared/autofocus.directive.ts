import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  constructor(public elementRef: ElementRef) { }

  setFocus() {
    this.elementRef.nativeElement.select();
  }

}
