import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO,getDate,lastDayOfMonth  } from 'date-fns';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let curDate = format(new Date(), 'yyyy-MM-dd');
    curDate = curDate + ' ' + value;
    return format(new Date(curDate), 'hh:mm a');
  }

}
