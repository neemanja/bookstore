import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(text: string, limit?: number): string {
    let trail="..."

    return text.length > limit ? text.substring(0, limit) + trail : text;
  }

}
