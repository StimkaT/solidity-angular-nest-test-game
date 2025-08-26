import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {
@Input() title: string = '';
@Input() finishText: string = '';
@Input() initialSeconds: number = 0;

private intervalId: any;
private remainingSeconds: number = 0;

  formattedHours: string = '00';
  formattedMinutes: string = '00';
  formattedSeconds: string = '00';
  isFinished: boolean = false;

  ngOnInit() {
    this.remainingSeconds = this.initialSeconds;
    this.updateDisplay();

    if (this.initialSeconds > 0) {
      this.startTimer();
    } else {
      this.isFinished = true;
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

private startTimer() {
    this.intervalId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDisplay();
      } else {
        this.isFinished = true;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

private updateDisplay() {
    const hours = Math.floor(this.remainingSeconds / 3600);
    const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
    const seconds = this.remainingSeconds % 60;

    this.formattedHours = hours.toString().padStart(2, '0');
    this.formattedMinutes = minutes.toString().padStart(2, '0');
    this.formattedSeconds = seconds.toString().padStart(2, '0');
  }
}
