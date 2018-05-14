import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToHtml'
})
export class StringToHtmlPipe implements PipeTransform {

  transform(value: string) {
    // 使用此管道必须给其父级div添加class：detail
    return $('.txt>.detail').html(value);
  }

}
