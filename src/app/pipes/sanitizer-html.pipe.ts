import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerHtml',
  standalone:true
})
export class SanitizerHtmlPipe implements PipeTransform {

  constructor(private sanitizer : DomSanitizer) { }

  transform(value: any, limit?: number): SafeHtml {
    if (!value) return " ";
    let truncate = value;
    if (limit) {
      if (value.length > limit) {
        truncate = value.substring(0,limit) + '...';
      }
    }
    const string = limit ? truncate.replace(/<img[^>]*>/g,""): truncate;
    return this.sanitizer.bypassSecurityTrustHtml(string);
  }

}
