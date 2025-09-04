import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges, OnDestroy {
  @Input() timerData: number | null = null;
  @Output() emitter = new EventEmitter();

  formattedHours: string = '00';
  formattedMinutes: string = '00';
  formattedSeconds: string = '00';
  isFinished: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timerData']) {
      this.updateDisplay();
    }
  }

  private updateDisplay() {
    if (this.timerData && this.timerData) {
      const hours = Math.floor(this.timerData / 3600);
      const minutes = Math.floor((this.timerData % 3600) / 60);
      const seconds = this.timerData % 60;

      this.formattedHours = hours.toString().padStart(2, '0');
      this.formattedMinutes = minutes.toString().padStart(2, '0');
      this.formattedSeconds = seconds.toString().padStart(2, '0');

      this.isFinished = this.timerData === 0;
    } else {
      this.formattedHours = '00';
      this.formattedMinutes = '00';
      this.formattedSeconds = '00';
      this.isFinished = false;
    }
  }

  sendEvent(event: string) {
    const message = {
      event: `TimerComponent:${event}`,
    };
    this.emitter.emit(message);
  }

  ngOnDestroy() {
    this.sendEvent('clearTimer');
  }
}
