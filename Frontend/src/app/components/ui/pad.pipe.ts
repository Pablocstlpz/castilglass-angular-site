import { Pipe, PipeTransform } from '@angular/core';

/** 1 → "01": index labels of the technical lists. */
@Pipe({ name: 'pad' })
export class PadPipe implements PipeTransform {
  transform(value: number): string {
    return String(value).padStart(2, '0');
  }
}
