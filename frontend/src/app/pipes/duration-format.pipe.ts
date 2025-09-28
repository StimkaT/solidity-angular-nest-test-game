import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true
})
export class DurationFormatPipe implements PipeTransform {
  transform(durationInSeconds: number): string {
    if (!durationInSeconds || durationInSeconds <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor(durationInSeconds / (60 * 60));
    const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
