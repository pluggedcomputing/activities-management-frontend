import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class orderByDate implements PipeTransform {
  transform(array: any[], order: string): any[] {
    if (!array || !order) {
      return array;
    }

    array.sort((a, b) => {
      const dateA = new Date(a[order]);
      const dateB = new Date(b[order]);
      return dateA.getTime() - dateB.getTime();
    });

    return array;
  }
}
