import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseHtml'
})
export class ParseHtmlPipe implements PipeTransform {

  transform(value: string){
    return $('.digest').html(value);
  }

}
