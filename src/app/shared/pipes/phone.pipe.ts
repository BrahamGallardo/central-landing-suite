import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: string): unknown {
    return `${value.slice(0, 2)}-${value.slice(2, 6)}-${value.slice(6)}`;
  }

}
