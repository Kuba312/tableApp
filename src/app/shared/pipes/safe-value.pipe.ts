import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})

export class SafeHtmlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {
  }

  transform(value: any): SafeHtml {
    if(!value) {
        return 'Brak wartosci!'
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }


}